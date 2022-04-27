import {NgModule} from '@angular/core';
import {EmailValidator} from './email.validator';


@NgModule({
  declarations: [
    EmailValidator,
  ],
  exports: [
    EmailValidator,
  ],
})
export class DirectivesModule {
}
