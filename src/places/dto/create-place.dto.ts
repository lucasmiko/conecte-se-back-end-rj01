import { IsNotEmpty } from 'class-validator';
import { IsFQDN } from 'class-validator';

export class CreatePlaceDto {
    @IsNotEmpty({ message:'O campo nome é obrigatório' })
    name: string;

    @IsNotEmpty()
    @IsFQDN()
    site: string;

    @IsNotEmpty()
    address: string;

    image: string;
    ticket: string;

    @IsNotEmpty()
    description: string;
}