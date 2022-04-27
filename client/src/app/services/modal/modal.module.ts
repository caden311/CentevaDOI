import { ConfirmCloseComponent } from './confirm-close/confirm-close.component';
import {NgModule} from '@angular/core';
import {ModalService} from './modal.service';
import {ModalComponent} from './modal.component';
import {BrowserModule} from '@angular/platform-browser';
import {ConfirmDeleteModule} from '../../components/confirm-delete/confirm-delete.module';
import {ModalContainerModule} from '../../components/modalContainer/modalContainer.module';

@NgModule({
  imports: [
    ConfirmDeleteModule,
    ModalContainerModule,
    BrowserModule,
  ],
  declarations: [
    ModalComponent,
    ConfirmCloseComponent,
  ],
  entryComponents: [
    ModalComponent,
    ConfirmCloseComponent,
  ],
  exports: [],
  providers: [
    ModalService,
  ],
})
export class ModalModule {}
