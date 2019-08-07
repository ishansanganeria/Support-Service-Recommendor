import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerSatisfactionComponent } from '../customer-satisfaction/customer-satisfaction.component';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})
export class TemperatureComponent {

  tempAvg: number;
  constructor(
    public dialogRef: MatDialogRef<TemperatureComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.tempAvg = data.tempAvg;
    }

    onNoClick(): void {
      this.dialogRef.close();
  }

  onClick(): void {
    const dialogRef = this.dialog.open(CustomerSatisfactionComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: {}
    });
  }


}
