import { Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerSatisfactionComponent } from '../customer-satisfaction/customer-satisfaction.component';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {

  diskAvg: number;
  constructor(
    public dialogRef: MatDialogRef<StorageComponent>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.diskAvg = data.diskAvg;
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
