import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewUserModalComponent } from './new-user-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../../../directives/directives.module';
import {FlipContainerModule} from '../../animated-containers/flip-container/flip-container.module';
import {FadeContainerModule} from '../../animated-containers/fade-container/fade-container.module';
import {TypeAheadModule} from '../../type-ahead/type-ahead.module';
import {Ng5SliderModule} from 'ng5-slider';
import {ModalContainerModule} from '../../modalContainer/modalContainer.module';
import {DropDownModule} from '../../drop-down/drop-down.module';
import {PipesModule} from '../../../pipes/pipes.module';

@NgModule({
  declarations: [NewUserModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    FlipContainerModule,
    FadeContainerModule,
    TypeAheadModule,
    Ng5SliderModule,
    ModalContainerModule,
    DropDownModule,
    PipesModule,
  ],
  exports: [NewUserModalComponent],
  entryComponents: [NewUserModalComponent],
})
export class NewUserModalModule { }
