import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LagerStandComponent } from './lager-stand/lager-stand.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule ,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
