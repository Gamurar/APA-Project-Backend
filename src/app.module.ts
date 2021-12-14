import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/apa'),
    ItemsModule,
  ],
})
export class AppModule {}
