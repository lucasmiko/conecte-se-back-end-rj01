import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlaceStatus } from './place-status.enum';
import { CreatePlaceDto } from './dto/create-place.dto';
import { GetPlacesFilterDto } from './dto/get-places-filter.dto';
import { UpdatePlaceProfileDto } from './dto/update-place-profile.dto';
import { PlacesRepository } from './dto/place.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Place } from './dto/place.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(PlacesRepository)
    private placesRepository: PlacesRepository){}

    async getPlaceById(id: string): Promise<Place> {
      const found = await this.placesRepository.findOne(id);

      if(!found) {
        throw new NotFoundException(`Lugar com o ID ${id} não encontrado`)
      }
      return found;
    }

    async createPlace(createPlaceDto: CreatePlaceDto): Promise<Place>{
      return this.placesRepository.createPlace(createPlaceDto);
    }


    // private places: Place[] = [];

    async getPlaces(filterDto: GetPlacesFilterDto): Promise<Place[]> {
        return this.placesRepository.getPlaces(filterDto);
    }

    // getPlacesWithFilters(filterDto: GetPlacesFilterDto): Place[] {
    //     const { status, search } = filterDto;
    
    //     let places = this.getAllPlaces();
    
    //     if (status) {
    //       places = places.filter((p) => p.status === status);
    //     }
    
    //     if (search) {
    //       places = places.filter((place) => {
    //         const s: string = search.toLocaleLowerCase();
    //         if (
    //           place.name.toLowerCase().includes(s) ||
    //           place.description.toLowerCase().includes(s) ||
    //           place.address.toLowerCase().includes(s) ||
    //           place.site.toLowerCase().includes(s)
    //         ) {
    //           return true;
    //         }
    //         return false;
    //       });
    //     }
    //     return places;
    //   }

    // getPlaceById(id: string): Place {
    //     const found =  this.places.find((place) => place.id === id);

    //     if(!found){
    //         throw new NotFoundException(`Lugar com o ID ${id} não encontrado`);
    //     }

    //     return found;
    // }

    // createPlace(createPlaceDto: CreatePlaceDto): Place{
    //     const { name, site, address, image, ticket, description, } = createPlaceDto;

    //     const place: Place = {
    //         id:uuid(),
    //         name,
    //         site,
    //         address,
    //         image,
    //         ticket,
    //         description,
    //         status: PlaceStatus.ACTIVE,
    //     };
    //     this.places.push(place);
    //     return place;
    // }

    async deletePlace(id: string): Promise<void> {
        const result = await this.placesRepository.delete(id);

        if(result.affected === 0){
          throw new NotFoundException(`Lugar com o id ${id} não encontrado`);
        }
    }

    async updatePlaceStatus(id: string, status: PlaceStatus): Promise<Place> {
        const place = await this.getPlaceById(id);
        place.status = status;

        await this.placesRepository.save(place)
        return place;
    }

    // updatePlaceProfile(
    //     id: string,
    //     updatePlaceProfileDto: UpdatePlaceProfileDto,
    // ): Place {
    //     const place = this.getPlaceById(id);
    //     const { name, site, address, image, ticket, description} = 
    //     updatePlaceProfileDto;

    //     place.name = name;
    //     place.site = site;
    //     place.address = address;
    //     place.image = image;
    //     place.ticket = ticket;
    //     place.description = description;

    //     return place;
    //}
}
