import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesRepository } from './dto/place.repository';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

@Module({
  imports:[TypeOrmModule.forFeature([PlacesRepository])],
  controllers: [PlacesController],
  providers: [PlacesService]
})
export class PlacesModule {}
