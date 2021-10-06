import { IsEnum } from 'class-validator';
import { PlaceStatus } from "../place.model";

export class UpdatePlaceStatusDto {
    //Nese caso o pipe validator faz com que só seja permitido ter o valor dentro do Enum, outro valor nao aceita
    @IsEnum(PlaceStatus)
    status: PlaceStatus;
}
