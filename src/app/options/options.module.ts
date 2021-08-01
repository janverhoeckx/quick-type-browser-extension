import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OptionsRoutingModule} from './options-routing.module';
import {OptionsComponent} from './pages/options/options.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {AddTemplateComponent} from './components/add-template/add-template.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [OptionsComponent, AddTemplateComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    OptionsRoutingModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class OptionsModule {
}
