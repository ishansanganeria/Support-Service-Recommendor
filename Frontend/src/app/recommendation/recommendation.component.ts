import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CustomerSatisfactionComponent } from '../customer-satisfaction/customer-satisfaction.component';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {

  constructor(public dialogRef: MatDialogRef<RecommendationComponent>,public dialog: MatDialog,
    ) { }

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
}
