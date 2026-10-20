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

import scheduleJson from './schedule.json' with { type: 'json' };

const schedule = { ...scheduleJson };

let minDate = Temporal.PlainDateTime.from({ year: 2025, month: 1, day: 1 });
let maxDate = Temporal.PlainDateTime.from({ year: 2020, month: 1, day: 1 });
schedule.plannings.forEach((planning) => {
  planning.events.forEach((event) => {
    const startDateTime = Temporal.PlainDateTime.from(event.startDateTime);
    const endDateTime = Temporal.PlainDateTime.from(event.endDateTime);
    if (Temporal.PlainDateTime.compare(startDateTime, minDate) < 0) {
      minDate = startDateTime;
    }
    if (Temporal.PlainDateTime.compare(endDateTime, maxDate) > 0) {
      maxDate = endDateTime;
    }
  });
});

const minMaxDays = minDate.until(maxDate).round('days').total('days');
const avgDate = minDate.add(
  Temporal.Duration.from({ days: Math.floor(minMaxDays / 2) }),
);
let newMaxDate = maxDate;

export const scheduleData = () => {
  const now = Temporal.Now.plainDateTimeISO();

  if (Temporal.PlainDateTime.compare(now, newMaxDate) > 0) {
    const deltaDays = avgDate.until(now).round('days');
    const delta = Temporal.Duration.from({
      weeks: Math.floor(deltaDays.total('days') / 7),
    });

    schedule.plannings.forEach((planning) => {
      planning.events.forEach((event) => {
        event.startDateTime = Temporal.PlainDateTime.from(
          event.startDateTime,
        ).add(delta);

        const endDateTime = Temporal.PlainDateTime.from(event.endDateTime).add(
          delta,
        );
        event.endDateTime = endDateTime;

        if (Temporal.PlainDateTime.compare(endDateTime, newMaxDate) > 0) {
          newMaxDate = endDateTime;
        }
      });
    });
  }

  return schedule;
};
