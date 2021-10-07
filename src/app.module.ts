import { Module } from '@nestjs/common';
import { PlacesModule } from './places/places.module';
import { CategoriesModule } from './categories/categories.module';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [PlacesModule, CategoriesModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user_backendrj01',
    password: 'user_backendrj01',
    autoLoadEntities: true,
    synchronize: true,
  })],
})
export class AppModule {}
