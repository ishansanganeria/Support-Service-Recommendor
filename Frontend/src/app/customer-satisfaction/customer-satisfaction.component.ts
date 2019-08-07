import { Component} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-customer-satisfaction',
  templateUrl: './customer-satisfaction.component.html',
  styleUrls: ['./customer-satisfaction.component.css']
})
export class CustomerSatisfactionComponent {

  constructor(private dialog: MatDialog) { }

  close(): void {
    this.dialog.closeAll();
  }



}
