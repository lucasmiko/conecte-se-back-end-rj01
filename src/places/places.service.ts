import { Injectable, NotFoundException } from '@nestjs/common';
import { PlaceStatus, Place } from './place.model';
import {v4 as uuid} from 'uuid';
import { CreatePlaceDto } from './dto/create-place.dto';

@Injectable()
export class PlacesService {
    private places: Place[] = [];

    getAllPlaces(): Place[] {
        return this.places;
    }

    getPlaceById(id: string): Place {
        const found =  this.places.find((place) => place.id === id);

        if(!found){
            throw new NotFoundException(`Lugar com o ID ${id} não encontrado`);
        }

        return found;
    }

    createPlace(createPlaceDto: CreatePlaceDto): Place{
        const { name, site, address, image, ticket, description, } = createPlaceDto;

        const place: Place = {
            id:uuid(),
            name,
            site,
            address,
            image,
            ticket,
            description,
            status: PlaceStatus.ACTIVE,
        };
        this.places.push(place);
        return place;
    }

    deletePlace(id: string): void {
        const found = this.getPlaceById(id);
        this.places = this.places.filter((place) => place.id !== found.id)
    }

    updatePlaceStatus(id: string, status: PlaceStatus): Place {
        const place= this.getPlaceById(id);
        place.status = status;
        return place;
    }

    //updatePlace(): Place {

    //}
}
