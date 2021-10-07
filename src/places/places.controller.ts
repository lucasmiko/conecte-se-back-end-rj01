import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GetPlacesFilterDto } from './dto/get-places-filter.dto';
import { Place } from './dto/place.entity';
import { UpdatePlaceProfileDto } from './dto/update-place-profile.dto';
import { UpdatePlaceStatusDto } from './dto/update-place-status.dto';
import { PlaceStatus} from './place-status.enum';
import { PlacesService } from './places.service';

// toda vez qeu cahamram http://localhost:300/places chama esse construtor
@Controller('places')
export class PlacesController {
    constructor(private placeServices: PlacesService){}

    @Get()
    getPlaces(@Query() filterDto: GetPlacesFilterDto): Promise<Place[]> {
      return this.placeServices.getPlaces(filterDto);
    
  }

    @Get('/:id')
    getPlaceBy(@Param('id') id: string): Promise<Place> {
        return this.placeServices.getPlaceById(id);
    }

    @Post()
    createPlace(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
        return this.placeServices.createPlace(createPlaceDto);
    }

    @Patch('/:id/status')
    updatePlaceStatus(@Param('id') id: string,
    @Body() updatePlaceStatus: UpdatePlaceStatusDto,
    ): Promise<Place>{
        const {status} = updatePlaceStatus;
        return this.placeServices.updatePlaceStatus(id, status);
    }

//     @Patch('/:id/profile')
//     updatePlaceProfile(
//         @Param('id') id: string,
//         @Body() updatePlaceProfileDto: UpdatePlaceProfileDto,
//     ): Place {
//         return this.placeServices.updatePlaceProfile(id, updatePlaceProfileDto);
//     }

    @Delete('/:id')
    deletePlace(@Param('id') id: string): Promise<void> {
        return this.placeServices.deletePlace(id);
    }
}
