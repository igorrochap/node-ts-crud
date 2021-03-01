import {EntityRepository, Repository} from "typeorm";
import {User} from "../model/User";

@EntityRepository(User)
class UserRepository extends Repository<User>{
    public async alreadyExists(email: string){
        return await this.findOne({ email })
    }
}

export { UserRepository }
