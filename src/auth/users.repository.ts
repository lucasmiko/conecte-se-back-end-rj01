import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from'bcrypt';
import { ColdObservable } from "rxjs/internal/testing/ColdObservable";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    async crateUser(authCredentialsDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //console.log('salt:', salt)
        //console.log('hashed', hashedPassword)

        const user = this.create({username, password: hashedPassword});
        try {
            await this.save(user);
        } catch(error) {
            if(error.sqlState === '23000') {
                throw new ConflictException('Username already exists!')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}