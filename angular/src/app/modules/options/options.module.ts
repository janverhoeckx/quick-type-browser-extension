import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OptionsRoutingModule} from './options-routing.module';
import {OptionsComponent} from './pages/options/options.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AddTemplateComponent} from './components/add-template/add-template.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [OptionsComponent, AddTemplateComponent],
  imports: [CommonModule, OptionsRoutingModule, MatButtonModule, MatInputModule, ReactiveFormsModule]
})
export class OptionsModule {
}
