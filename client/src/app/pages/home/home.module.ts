import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {TypeAheadModule} from '../../components/type-ahead/type-ahead.module';
import {PipesModule} from '../../pipes/pipes.module';
import {UserTileModule} from '../../components/user-tile/user-tile.module';
import {NewUserModalModule} from '../../components/modals/new-user-modal/new-user-modal.module';
import {ModalModule} from '../../services/modal/modal.module';
import {FadeContainerModule} from '../../components/animated-containers/fade-container/fade-container.module';
import {FlipContainerModule} from '../../components/animated-containers/flip-container/flip-container.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TypeAheadModule,
    PipesModule,
    UserTileModule,
    NewUserModalModule,
    ModalModule,
    FadeContainerModule,
    FlipContainerModule,
  ]
})
export class HomeModule { }
