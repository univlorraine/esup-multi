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

import { Injectable } from '@nestjs/common';
import { AesEncryptionParametersDto } from './aes-encryption.dto';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const KEY_SIZE = 32;
const IV_SIZE = 16;
const BYTES_ENCODING = 'hex';
const CIPHER_ALGORITHM = 'aes-256-cbc';
const ENCRYPTED_ENCODING = 'base64';
const CLEAR_ENCODING = 'utf8';

@Injectable()
export class AesEncryptionService {
  public generateRandomEncryptionParameters(): AesEncryptionParametersDto {
    return {
      iv: this.randomBytesString(IV_SIZE),
      key: this.randomBytesString(KEY_SIZE),
    };
  }

  public encrypt(
    encryptionParameters: AesEncryptionParametersDto,
    clearText: string,
  ): string {
    const key = Buffer.from(encryptionParameters.key, BYTES_ENCODING);
    const iv = Buffer.from(encryptionParameters.iv, BYTES_ENCODING);
    const cipher = createCipheriv(CIPHER_ALGORITHM, key, iv);
    const encrypted = cipher.update(
      clearText,
      CLEAR_ENCODING,
      ENCRYPTED_ENCODING,
    );
    return encrypted + cipher.final(ENCRYPTED_ENCODING);
  }

  public decrypt(
    encryptionParameters: AesEncryptionParametersDto,
    encryptedText: string,
  ): string {
    const key = Buffer.from(encryptionParameters.key, BYTES_ENCODING);
    const iv = Buffer.from(encryptionParameters.iv, BYTES_ENCODING);
    const decipher = createDecipheriv(CIPHER_ALGORITHM, key, iv);
    const clear = decipher.update(
      encryptedText,
      ENCRYPTED_ENCODING,
      CLEAR_ENCODING,
    );
    return clear + decipher.final(CLEAR_ENCODING);
  }

  private randomBytesString(size: number): string {
    return randomBytes(size).toString(BYTES_ENCODING);
  }
}
