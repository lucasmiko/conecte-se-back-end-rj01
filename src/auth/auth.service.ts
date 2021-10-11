import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {InjectRepository} from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.crateUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialDto): Promise<string> {
        const {username, password} = authCredentialsDto;

        const user = await this.userRepository.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))) {
            return 'Success';
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
