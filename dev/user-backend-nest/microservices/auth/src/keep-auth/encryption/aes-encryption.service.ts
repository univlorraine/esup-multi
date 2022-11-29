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
