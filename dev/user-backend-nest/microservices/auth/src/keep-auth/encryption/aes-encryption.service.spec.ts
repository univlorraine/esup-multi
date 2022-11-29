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
