import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerSatisfactionComponent } from '../customer-satisfaction/customer-satisfaction.component';

@Component({
  selector: 'app-ram',
  templateUrl: './ram.component.html',
  styleUrls: ['./ram.component.css']
})
export class RamComponent{

  ramAvg: number;
  constructor(
    public dialogRef: MatDialogRef<RamComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.ramAvg = data.ramAvg;
    }

    onNoClick(): void {
      this.dialogRef.close();
  }

  onClick(): void {
    const dialogRef = this.dialog.open(CustomerSatisfactionComponent, {
      disableClose: true,
      width: 'auto',
      height:'auto',
      data: {}
    });
  }

}
