import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GamingComponent } from '../gaming/gaming.component';


@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent{

  constructor(
    public dialogRef: MatDialogRef<SuggestionComponent>,public dialog: MatDialog){}

onNoClick(): void {
  this.dialogRef.close();
  }

gaming(): void {
  const dialogRef = this.dialog.open(GamingComponent, {
    disableClose: true,
    width: '30%',
    height: '30%',
    data: {}
  });
}

}
