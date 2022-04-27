import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../../src/common/models/user';
import {colorsByRank} from '../../static/static';
import {TweenMax} from 'gsap/TweenMax';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-tile.component.html',
  styleUrls: ['./user-tile.component.scss']
})
export class UserTileComponent implements OnInit {

  @Input() user: User;
  @ViewChild('usertile', {static: false}) public tile: ElementRef;

  public colorsByRank = colorsByRank;

  constructor() { }

  ngOnInit() {
  }

  public animateTile() {
    TweenMax.to(this.tile.nativeElement, .5, {x: 15});
  }
  public revertTile() {
    TweenMax.to(this.tile.nativeElement, .5, {x: 0});
  }
}
