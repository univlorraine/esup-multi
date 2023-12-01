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

import { Test, TestingModule } from '@nestjs/testing';
import { AesEncryptionService } from './aes-encryption.service';

describe('AesEncryptionService', () => {
  let service: AesEncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AesEncryptionService],
    }).compile();

    service = module.get<AesEncryptionService>(AesEncryptionService);
  });

  it('should generate AES random key and iv', () => {
    const encryptionParameters = service.generateRandomEncryptionParameters();
    console.log(encryptionParameters);
    expect(encryptionParameters.iv).toMatch(/^[0-9a-fA-F]{32}$/);
    expect(encryptionParameters.key).toMatch(/^[0-9a-fA-F]{64}$/);
  });

  it('should encrypt AES in base64', () => {
    const encryptionParameters = {
      iv: 'a945dde8f65fdf1666599d70773dad7f',
      key: '51c97312ca7275b1d3dfcb9f13de6d31ba8f2f4e952dfeac1ff4f74b4fefd97c',
    };
    const encrypted = service.encrypt(
      encryptionParameters,
      'this is my secret message',
    );

    expect(encrypted).toBe('PH+sorqaSgPySHyzMn899D3AQigB6tOs0+pLhGCWWK4=');
  });

  it('should decrypt AES from base64', () => {
    const encryptionParameters = {
      iv: 'a945dde8f65fdf1666599d70773dad7f',
      key: '51c97312ca7275b1d3dfcb9f13de6d31ba8f2f4e952dfeac1ff4f74b4fefd97c',
    };
    const decrypted = service.decrypt(
      encryptionParameters,
      'PH+sorqaSgPySHyzMn899D3AQigB6tOs0+pLhGCWWK4=',
    );

    expect(decrypted).toBe('this is my secret message');
  });
});
