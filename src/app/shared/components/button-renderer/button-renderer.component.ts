import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  private params: any;
  public refresh(params: ICellRendererParams): boolean {
      return true;
  }
  public agInit(params: ICellRendererParams): void {
      this.params = params;
  }
  public afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
  }

  public OnEditClick($event: any) {
    console.log('Entering OnEditClick!');
    console.log(this.params);
    if (this.params.onClick instanceof Function) {
        const params = {
            event: $event,
            rowData: this.params.data,
            rowIndex: this.params.rowIndex,
            action: 'edit'
        };
        this.params.onClick(params);
    }
    console.log('Exiting OnEditClick!');
  }

  public OnSaveClick($event: any) {
    console.log('Entering OnSaveClick!');
    console.log(this.params);
    if (this.params.onClick instanceof Function) {
        const params = {
            event: $event,
            rowData: this.params.data,
            rowIndex: this.params.rowIndex,
            action: 'save'
        };
        this.params.onClick(params);
    }
    console.log('Exiting OnSaveClick!');
  }

  public OnDeleteClick($event: any) {
    console.log('Entering OnDeleteClick!');
    console.log(this.params);
    if (this.params.onClick instanceof Function) {
        const params = {
            event: $event,
            rowData: this.params.data,
            rowIndex: this.params.rowIndex,
            action: 'delete'
        };
        console.log('RowIndex selected :: ' + this.params.rowIndex);
        this.params.onClick(params);
    }
    console.log('Exiting OnDeleteClick!');
  }

}
