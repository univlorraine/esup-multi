import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, zip } from 'rxjs';
import { activePlanningIds$, HiddenCourse, hiddenCourseList$, schedule$, setActivePlanningIds } from '../../schedule.repository';

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
  public hiddenCourseList$: Observable<HiddenCourse[]> = hiddenCourseList$;

  constructor(
    private formBuilder: FormBuilder
  ) {
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

    zip(schedule$, activePlanningIds$)
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
    setActivePlanningIds(selectedPlanningIds);
  }



}
