import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DropDownComponent } from './drop-down.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  exports: [DropDownComponent],
  declarations: [DropDownComponent],
  providers: [],
})
export class DropDownModule { }
