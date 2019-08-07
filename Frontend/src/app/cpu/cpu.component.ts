import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerSatisfactionComponent } from '../customer-satisfaction/customer-satisfaction.component';

@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent {

  cpuAvg: number;
  constructor(
    public dialogRef: MatDialogRef<CpuComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.cpuAvg = data.cpuAvg;
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
