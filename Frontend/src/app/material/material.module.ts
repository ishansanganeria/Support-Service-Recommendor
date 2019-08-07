import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatRadioModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatRadioModule
  ],
  exports: [ MatToolbarModule,
             MatSidenavModule,
             MatCardModule,
             MatButtonModule,
             MatGridListModule,
             MatDialogModule,
             MatButtonToggleModule,
             MatFormFieldModule,
             MatInputModule,
             MatSelectModule,
             MatSlideToggleModule,
             MatExpansionModule,
             MatRadioModule
  ]
})
export class MaterialModule { }
