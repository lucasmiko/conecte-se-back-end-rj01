import { Body, Controller, Get, Post } from '@nestjs/common';
import { Place } from './place.model';
import { PlacesService } from './places.service';

// toda vez qeu cahamram http://localhost:300/places chama esse construtor
@Controller('places')
export class PlacesController {
    constructor(private placeServices: PlacesService){}

    @Get()
    getAllPlaces(): Place[]{
        return this.placeServices.getAllPlaces();
    }

    @Post()
    createPlace(
        @Body('name') name: string,
        @Body('site') site: string,
        @Body('address') address: string,
        @Body('image') image: string,
        @Body('ticket') ticket: string,
        @Body('description') description: string,
    ) {
        return this.placeServices.createPlace(
            name,
            site,
            address,
            image,
            ticket,
            description,
        );
    }

}
