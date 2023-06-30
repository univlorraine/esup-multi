# Application MULTI - Backend utilisateur
- [Gateway API](dev/user-backend-nest/main/README.md)
- [Microservice auth](dev/user-backend-nest/microservices/auth/README.md)
- [Microservice info](dev/user-backend-nest/microservices/info/README.md)
- [Microservice map](dev/user-backend-nest/microservices/map/README.md)
- [Microservice cards](dev/user-backend-nest/microservices/cards/README.md)
- [Microservice rss](dev/user-backend-nest/microservices/rss/README.md)
- [Microservice clocking](dev/user-backend-nest/microservices/clocking/README.md)
- [Microservice mail-calendar](dev/user-backend-nest/microservices/mail-calendar/README.md)

## Créer un nouveau microservice

Se placer dans le dossier `microservices/` et exécuter :
```bash
nest new [nom-du-microservice]
```

Se placer dans le nouveau dossier qui vient d'être créé `microservices/[nom-du-microservice]/` puis exéctuer :
```bash
npm i --save @nestjs/microservices
```

Remplacer le contenu du fichier `microservices/[nom-du-microservice]/src/main.ts` par le code suivant, en replaçant les éléments entre crochet (Attention à ne pas prendre un port par défaut déjà pris par un autre microservice).
```typescript
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const host = process.env.[NOM-DU-MICROSERVICE]_SERVICE_HOST || '127.0.0.1';
  const port = parseInt(process.env.[NOM-DU-MICROSERVICE]_SERVICE_PORT) || 30[XX];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
      logger:
          process.env.EXTENDED_LOGS === 'true'
              ? ['error', 'warn', 'log', 'debug', 'verbose']
              : ['error', 'warn', 'log'],
    },
  );
  Logger.log(`Listening on host ${host}, port ${port}`);
  await app.listen();
}
bootstrap();
```

Ne pas oublier de créer les différentes variables d'env:
```
[NOM-DU-MICROSERVICE]_SERVICE_HOST=[NOM]
[NOM-DU-MICROSERVICE]_SERVICE_PORT=[PORT]
EXTENDED_LOGS=true //ou false
```
Ces trois lignes sont à ajouter à la suite du `/main/.env` ainsi que du `/[NOM-DU-MICROSERVICE]/.env`

### Etat de santé des microservices

Ajouter le code suivant dans le controller du microservice :
```typescript
import * as infosJsonData from './infos.json';
...

@MessagePattern({ cmd: 'health' })
getHealthStatus() {
    return {
        message: 'up',
        name: infosJsonData.name,
        version: infosJsonData.version,
    };
}
```
Ajouter  `"resolveJsonModule": true`dans `tsconfig.json`

Créer un fichier `update-infos.ts` à la racine du microservice avec le code suivant
```typescript
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageData = require('./package.json');

const version = packageData.version;
const serviceName = packageData.name;
const info = {
    name: serviceName,
    version,
};

const infoJson = JSON.stringify(info, null, 2);
fs.writeFileSync('src/infos.json', infoJson);

```

Mofifier `package.json` pour ajouter un script prebuild :
`"prebuild": "node update-infos.ts"`

Ajouter également la vérification de l'état de santé au niveau global, dans `global-health.controller.ts`