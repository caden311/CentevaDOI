import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {

  @Input() public currRank: number;
  @Input() public icon: string;
  @Input() public iconColor: string;
  @Input() public label: string;
  @Input() public buttonType = 'btn-outline-secondary';
  @Input() public hideArrow = false;
  @Input() public fontSize = 'inherit';
  @Input() public size = 'sm';
  @Output() public deleteItem = new EventEmitter();

  constructor() { }

  public ngOnInit() { }


}
