import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecommendationComponent } from '../recommendation/recommendation.component';

@Component({
  selector: 'app-newusers',
  templateUrl: './newusers.component.html',
  styleUrls: ['./newusers.component.css']
})
export class NewusersComponent {

  constructor(public dialogRef: MatDialogRef<NewusersComponent>, public dialog: MatDialog) { }

  onClick(): void {
    const dialogRef = this.dialog.open(RecommendationComponent, {
      disableClose: true,
      width: '45%',
      height: '90%',
      data: {}
    });
  }

}
