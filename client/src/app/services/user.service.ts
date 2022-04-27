import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import * as _ from 'lodash';
import {User} from '../../../../src/common/models/user';


@Injectable()
export class UserService {

  constructor(private httpService: HttpService) {
  }

  public getUsersBySkill(skill) {
    return this.httpService.get('/api/userskills/' + skill)
      .then((foundUsers) => {
        const users = [];
        _.forEach(foundUsers, (u) => {
          const currSkill = _.find(u.skills, {name: skill});
          u.currentRank = currSkill.rank;
          users.push(u);
        });
        return users;
      });
  }

  public createOrUpdateUser(user: User) {
    return this.httpService.post('/api/users', user)
      .then((res) => {
        return res;
      });
  }

  public getUser(email) {
    return this.httpService.get('/api/users/' + email);
  }
}
