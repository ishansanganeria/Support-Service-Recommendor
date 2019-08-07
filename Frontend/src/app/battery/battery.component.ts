import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerSatisfactionComponent } from '../customer-satisfaction/customer-satisfaction.component';
import { SuggestionComponent } from '../suggestion/suggestion.component';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent {

   batteryAvg: number;
  constructor(
    public dialogRef: MatDialogRef<BatteryComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.batteryAvg = data.batteryAvg;
    }

    onNoClick(): void {
      this.dialogRef.close();
  }

  onClick(): void {
    const dialogRef = this.dialog.open(CustomerSatisfactionComponent, {
      disableClose: true,
      width: '30%',
      height: '40%',
      data: {}
    });
  }

  service(): void {
    const dialogRef = this.dialog.open(SuggestionComponent, {
      disableClose: true,
      width: '30%',
      height: '40%',
      data: {}
    });
  }

}
