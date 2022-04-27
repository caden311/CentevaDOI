import * as _ from 'lodash';
import {IUserSkills} from '../interfaces/user.interface';

export class User {

    constructor(data = {}) {
        _.assign(this, data);
    }

    public _id: string;
    public firstname?: string;
    public lastname?: string;
    public skills?: IUserSkills [];
    public currentRank?: number;
    public createdAt?: Date;
    public updatedAt?: Date;

}
