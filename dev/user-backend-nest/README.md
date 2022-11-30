# Application MULTI - Backend utilisateur
- [Gateway API](dev/user-backend-nest/main/README.md)
- [Microservice auth](dev/user-backend-nest/microservices/auth/README.md)
- [Microservice info](dev/user-backend-nest/microservices/info/README.md)
- [Microservice map](dev/user-backend-nest/microservices/map/README.md)
- [Microservice cards](dev/user-backend-nest/microservices/cards/README.md)
- [Microservice rss](dev/user-backend-nest/microservices/rss/README.md)

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
  const port = parseInt(process.env.[NOM-DU-MICROSERVICE]_SERVICE_PORT) || 30[XX];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );
  Logger.log(`Listening on port ${port}`);
  await app.listen();
}
bootstrap();
```
