import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GetPlacesFilterDto } from './dto/get-places-filter.dto';
import { UpdatePlaceProfileDto } from './dto/update-place-profile.dto';
import { UpdatePlaceStatusDto } from './dto/update-place-status.dto';
import { PlaceStatus, Place } from './place.model';
import { PlacesService } from './places.service';

// toda vez qeu cahamram http://localhost:300/places chama esse construtor
@Controller('places')
export class PlacesController {
    constructor(private placeServices: PlacesService){}

    @Get()
    getPlaces(@Query() filterDto: GetPlacesFilterDto): Place[] {
    if (Object.keys(filterDto).length) {
      return this.placeServices.getPlacesWithFilters(filterDto);
    } else {
      return this.placeServices.getAllPlaces();
    }
  }

    @Get('/:id')
    getPlaceBy(@Param('id') id: string): Place {
        return this.placeServices.getPlaceById(id);
    }

    @Post()
    createPlace(@Body() createPlaceDto: CreatePlaceDto): Place {
        return this.placeServices.createPlace(createPlaceDto);
    }

    @Patch('/:id/status')
    updatePlaceStatus(@Param('id') id: string,
    @Body() updatePlaceStatus: UpdatePlaceStatusDto,
    ): Place{
        const {status} = updatePlaceStatus;
        return this.placeServices.updatePlaceStatus(id, status);
    }

    @Patch('/:id/profile')
    updatePlaceProfile(
        @Param('id') id: string,
        @Body() updatePlaceProfileDto: UpdatePlaceProfileDto,
    ): Place {
        return this.placeServices.updatePlaceProfile(id, updatePlaceProfileDto);
    }

    @Delete('/:id')
    deletePlace(@Param('id') id: string): void {
        return this.placeServices.deletePlace(id);
    }
}
