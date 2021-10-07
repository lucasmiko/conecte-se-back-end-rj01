import { IsNotEmpty } from 'class-validator';
import { IsFQDN } from 'class-validator';

export class CreatePlaceDto {
    @IsNotEmpty({ message:'O campo nome é obrigatório' })
    name: string;

    @IsNotEmpty({ message:'O Site nome é obrigatório' })
    @IsFQDN()
    site: string;

    @IsNotEmpty({ message:'O Endereço nome é obrigatório' })
    address: string;

    image: string;
    ticket: string;

    @IsNotEmpty({ message:'O descrição nome é obrigatório' })
    description: string;
}