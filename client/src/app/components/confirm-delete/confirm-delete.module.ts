import {NgModule} from '@angular/core';

import {ConfirmDeleteComponent} from './confirm-delete.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { ModalContainerModule } from '../modalContainer/modalContainer.module';
import {FlipContainerModule} from '../animated-containers/flip-container/flip-container.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FlipContainerModule,
    ModalContainerModule
  ],
  declarations: [ConfirmDeleteComponent],
  entryComponents: [ConfirmDeleteComponent],
  exports: [ConfirmDeleteComponent],
  providers: [],
})
export class ConfirmDeleteModule {
}
