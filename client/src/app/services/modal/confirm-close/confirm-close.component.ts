import { Component, OnInit, EventEmitter } from '@angular/core';
import { IModalComponent } from '../modal.service';

@Component({
  selector: 'app-confirm-close',
  templateUrl: './confirm-close.component.html',
  styleUrls: ['./confirm-close.component.scss']
})
export class ConfirmCloseComponent implements OnInit, IModalComponent {

  public onDismiss = new EventEmitter();

  constructor() { }

  public ngOnInit() {}

}
