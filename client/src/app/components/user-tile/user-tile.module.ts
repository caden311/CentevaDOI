import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTileComponent } from './user-tile.component';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [UserTileComponent],
  exports: [
    UserTileComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
  ]
})
export class UserTileModule { }
