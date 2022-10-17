import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Info } from './info.dto';

@Injectable()
export class InfoService {
  getInfoList(): Observable<Info[]> {
    const infoList: Info[] = [
      {
        id: 1,
        title: "S’inscrire à l'université de Lorraine",
        content:
          "Les étapes de l'inscription à l'université varient en fonction de votre profil. Connaître ces étapes, c'est être certain de s'inscrire en toute sérénité.",
        link: 'https://www.univ-lorraine.fr/enseignements-et-formations/sinscrire-a-l-universite-de-lorraine/',
      },
      {
        id: 2,
        title: 'Le projet OTO twin récompensé',
        content:
          'Le projet OTO twin récompensé lors des Tremplins de la E-Sante City Healthcare !',
        link: 'https://factuel.univ-lorraine.fr/node/21254',
      },
      {
        id: 3,
        title: 'Contenu sans lien',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
    ];

    return of(infoList);
  }
}
