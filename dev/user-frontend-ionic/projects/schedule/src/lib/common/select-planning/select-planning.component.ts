/*
 * Copyright ou © ou Copr. Université de Lorraine, (2022)
 *
 * Direction du Numérique de l'Université de Lorraine - SIED
 *  (dn-mobile-dev@univ-lorraine.fr)
 * JNESIS (contact@jnesis.com)
 *
 * Ce logiciel est un programme informatique servant à rendre accessible
 * sur mobile divers services universitaires aux étudiants et aux personnels
 * de l'université.
 *
 * Ce logiciel est régi par la licence CeCILL 2.1, soumise au droit français
 * et respectant les principes de diffusion des logiciels libres. Vous pouvez
 * utiliser, modifier et/ou redistribuer ce programme sous les conditions
 * de la licence CeCILL telle que diffusée par le CEA, le CNRS et INRIA
 * sur le site "http://cecill.info".
 *
 * En contrepartie de l'accessibilité au code source et des droits de copie,
 * de modification et de redistribution accordés par cette licence, il n'est
 * offert aux utilisateurs qu'une garantie limitée. Pour les mêmes raisons,
 * seule une responsabilité restreinte pèse sur l'auteur du programme, le
 * titulaire des droits patrimoniaux et les concédants successifs.
 *
 * À cet égard, l'attention de l'utilisateur est attirée sur les risques
 * associés au chargement, à l'utilisation, à la modification et/ou au
 * développement et à la reproduction du logiciel par l'utilisateur étant
 * donné sa spécificité de logiciel libre, qui peut le rendre complexe à
 * manipuler et qui le réserve donc à des développeurs et des professionnels
 * avertis possédant des connaissances informatiques approfondies. Les
 * utilisateurs sont donc invités à charger et à tester l'adéquation du
 * logiciel à leurs besoins dans des conditions permettant d'assurer la
 * sécurité de leurs systèmes et/ou de leurs données et, plus généralement,
 * à l'utiliser et à l'exploiter dans les mêmes conditions de sécurité.
 *
 * Le fait que vous puissiez accéder à cet en-tête signifie que vous avez
 * pris connaissance de la licence CeCILL 2.1, et que vous en avez accepté les
 * termes.
 */

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { HiddenCourse, scheduleStoreManager } from '../../schedule.repository';
import { ScheduleService } from '../../schedule.service';

interface AvailablePlanningFormInput extends AvailablePlanning {
  checked: boolean;
}
interface AvailablePlanning {
  id: string;
  label: string;
}

const atLeastOneCheckedValidator = (): ValidatorFn =>
 (control: FormArray): ValidationErrors | null => {
    const countChecked = control.controls.filter(c => c.value === true).length;
    return countChecked >= 1 ? null : {atLeastOnChecked: false};
  };

@Component({
  selector: 'app-select-planning',
  templateUrl: './select-planning.component.html',
  styleUrls: ['./select-planning.component.scss'],
})
export class SelectPlanningComponent {

  form: FormGroup;
  public isSelectPlanningModalOpen = false;
  public isHiddenCourseModalOpen = false;
  public isLoading = false;
  public availablePlanningList: AvailablePlanning[] = [];
  public lastSelectedPlanningIndex: number | null = null;
  public hiddenCourseList$: Observable<HiddenCourse[]> = scheduleStoreManager.hiddenCourseList$;

  constructor(
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService
  ) {
    this.scheduleService.asUser.subscribe(
      () => this.hiddenCourseList$ = this.scheduleService.getStoreManager().hiddenCourseList$
    );
    this.form = this.formBuilder.group({
      planningList: this.formBuilder.array([], atLeastOneCheckedValidator())
    });
  }

  get planningList() {
    return this.form.get('planningList') as FormArray;
  }

  async validate() {
    this.applySelectedPlanning();
    this.closeSelectPlanningModal();
  }

  closeSelectPlanningModal() {
    this.isSelectPlanningModalOpen = false;
    this.planningList.clear();
  }

  onDismissSelectPlanningModal() {
    this.closeSelectPlanningModal();
    return false;
  }

  openSelectPlanningModal() {
    this.isLoading = true;
    this.isSelectPlanningModalOpen = true;

    zip(this.scheduleService.getStoreManager().schedule$, this.scheduleService.getStoreManager().activePlanningIds$)
      .pipe(filter(([schedule]) => schedule !== null && schedule !== undefined))
      .subscribe(([schedule, activePlanningIds]) => {
          const availablePlanningFormInputs = schedule.plannings.map(p => ({
            id: p.id,
            label: p.label,
            checked: activePlanningIds.includes(p.id)
          }));
          this.buildForm(availablePlanningFormInputs);
          this.isLoading = false;
        });
  }

  openHiddenCourseModal(){
    this.isHiddenCourseModalOpen = true;
  }

  onDismissHiddenCourseModal(){
    this.closeHiddenCourseModal();
    return false;
  }

  closeHiddenCourseModal(){
    this.isHiddenCourseModalOpen = false;
  }

  private buildForm(availablePlanningFormInputs: AvailablePlanningFormInput[]) {
    this.planningList.clear();
    availablePlanningFormInputs.forEach(formInput => this.planningList.push(new FormControl(formInput.checked)));
    this.availablePlanningList = availablePlanningFormInputs.map(formInput => ({
      id: formInput.id,
      label: formInput.label,
    }));
  }

  private applySelectedPlanning() {
    const selectedPlanningIds = [];
    for (const i in this.planningList.value) {
      if( this.planningList.value[i] === true ) {
        selectedPlanningIds.push(this.availablePlanningList[i].id);
      }
    }

    this.scheduleService.getStoreManager().setActivePlanningIds(selectedPlanningIds);
  }
}
