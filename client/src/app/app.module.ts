import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpService} from './services/http.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {SkillService} from './services/skill.service';
import {ModalService} from './services/modal/modal.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    HttpService,
    UserService,
    SkillService,
    ModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
