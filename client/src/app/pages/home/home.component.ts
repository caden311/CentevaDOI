import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import * as _ from 'lodash';
import {UserService} from '../../services/user.service';
import {SkillService} from '../../services/skill.service';
import {ModalService} from '../../services/modal/modal.service';
import {NewUserModalComponent} from '../../components/modals/new-user-modal/new-user-modal.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public users = [];
  public skills: string [] = [];
  public currentSkill = null;
  public site = '';

  constructor(private userService: UserService, private skillService: SkillService, private modalService: ModalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params.site) {
        this.site = params.site;
      }
    });
    this.loadSkills();
  }

  public loadSkills() {
    this.skillService.getAllSkills()
      .then((skills) => {
        this.skills = skills;
      });
  }

  public searchUsers(skill) {
    this.userService.getUsersBySkill(skill)
      .then((users) => {
        this.currentSkill = skill;
        this.users = users;
      });
  }

  public openNewUserModal() {
    this.modalService.create(NewUserModalComponent, {params: {skills: this.skills}})
      .then(() => {
        this.loadSkills();
      });
  }
}
