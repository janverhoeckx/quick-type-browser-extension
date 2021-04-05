import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OptionsRoutingModule } from './options-routing.module';
import { OptionsComponent } from './pages/options/options.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [OptionsComponent],
    imports: [CommonModule, OptionsRoutingModule, MatButtonModule]
})
export class OptionsModule {}
