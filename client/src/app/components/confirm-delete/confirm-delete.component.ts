import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import {IModalComponent, ModalService} from '../../services/modal/modal.service';

export interface IConfirmDeleteParams {
  title?: string;
  message?: string;
  name?: string;
  cancelStr?: string;
  confirmStr?: string;
  icon?: string;
  confirmBtn?: string;
}

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeleteComponent implements OnInit, IModalComponent {

  public onDismiss = new EventEmitter();
  public onCloseClicked = new EventEmitter();
  public params: IConfirmDeleteParams = {};

  public typedValue;
  public errorMessage;

  constructor(
    private modalService: ModalService,
  ) { }

  public ngOnInit() {
    this.params = this.params || {};
    this.params.icon = this.params.icon || 'icon-trash-2';
    this.params.title = this.params.title || 'Are You Sure?';
    this.params.message = this.params.message || 'Delete Confirmation';
    this.params.cancelStr = this.params.cancelStr || 'No, Cancel';
    this.params.confirmStr = this.params.confirmStr || 'Yes, Delete';
    this.params.confirmBtn = this.params.confirmBtn || 'btn-danger';
  }

  public close() {
    this.onCloseClicked.emit();
  }

  public deleteObject() {
    if (!this.params.name) {
      this.onDismiss.next({success: true});
    } else {
      this.typedValue = this.typedValue.trim();
      if (this.typedValue && this.typedValue.toLocaleLowerCase() === this.params.name.toLocaleLowerCase()) {
        this.onDismiss.next({success: true});
      } else {
        this.errorMessage = `Please type "${this.params.name}" above to delete.`;
      }
    }
  }
}
