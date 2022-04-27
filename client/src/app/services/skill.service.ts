import {Injectable} from '@angular/core';
import {HttpService} from './http.service';


@Injectable()
export class SkillService {

  constructor(private httpService: HttpService) {
  }

  public getAllSkills() {
    return this.httpService.get('/api/skills')
      .then((skills) => {
        return skills;
      });
  }

}
