import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RecommendationComponent } from '../recommendation/recommendation.component';

@Component({
  selector: 'app-gaming',
  templateUrl: './gaming.component.html',
  styleUrls: ['./gaming.component.css']
})
export class GamingComponent {

  constructor(
    public dialogRef: MatDialogRef<GamingComponent>,public dialog: MatDialog){}

  onNoClick(): void {
    this.dialogRef.close();
    }
  onClick(): void {
    const dialogRef = this.dialog.open(RecommendationComponent, {
      disableClose: true,
      width: '45%',
      height: '90%',
      data: {}
    });
  }

}
