import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module'
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/apa'),
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
