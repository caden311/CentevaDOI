import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {IModalComponent} from '../../../services/modal/modal.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUserSkills} from '../../../../../../src/common/interfaces/user.interface';
import {EmailValidator} from '../../../directives/email.validator';
import {User} from '../../../../../../src/common/models/user';
import {UserService} from '../../../services/user.service';
import * as _ from 'lodash';
import {colorsByRank} from '../../../static/static';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss']
})
export class NewUserModalComponent implements OnInit, IModalComponent {

  public onDismiss = new EventEmitter();
  public params: any = {};
  public form: FormGroup;
  public userSkills: IUserSkills [] = [];
  public skills = [];
  public userAlreadyLoaded = false;
  public colorsByRank = colorsByRank;
  public descriptions = {
    1: 'That bad huh..',
    2: 'So you\'ve dabbled..',
    3: 'Made a few code edits..',
    4: 'You know the basics..',
    5: 'You know your way around..',
    6: 'You could definitely help..',
    7: 'Some would say you have talent..',
    8: 'At least a year experience here..',
    9: 'Expert status..',
    10: 'So you\'ve memorised the documentation..'
  };

  @ViewChild('email', {static: true}) emailInput;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    setTimeout(() => {
      this.emailInput.nativeElement.focus();
    });

    if (this.params && this.params.skills) {
      this.skills = this.params.skills;
    }

    this.form = this.fb.group({
      _id: ['', [Validators.required, EmailValidator.Validate]],
      firstname: [''],
      lastname: [''],
    });
  }

  public emailChanged(email) {
    if (this.form.controls._id.valid && email) {
      this.userService.getUser(email)
        .then((user: User) => {
          if (user && !this.userAlreadyLoaded) {
            this.userSkills = user.skills;
            this.form.patchValue({_id: user._id, firstname: user.firstname, lastname: user.lastname});
            this.userAlreadyLoaded = true;
          }
        });
    } else {
      this.userAlreadyLoaded = false;
      this.userSkills = [];
    }
  }
  public saveUser(userForm) {
    if (userForm.value._id && this.userSkills) {
      const user: User = {
        _id: userForm.value._id,
        firstname: userForm.value.firstname || '',
        lastname: userForm.value.lastname || '',
        skills: this.userSkills,
      };
      this.userService.createOrUpdateUser(user)
        .then(() => {
          this.onDismiss.emit();
        });
    }
  }
  public removeSkill(index) {
    this.userSkills.splice(index, 1);
  }
  public addSkill(name) {
    if (name && name.indexOf(',') !== -1) {
      const names = name.split(',');
      _.forEach(names, (n) => {
        this.userSkills.push({rank: 5, name: n.trim().toLowerCase()});
      });
    } else if (name) {
      this.userSkills.push({rank: 5, name: name.trim().toLowerCase()});
    }
  }

  public setSkillRank(rank, index) {
    this.userSkills[index].rank = +rank;
  }

}
