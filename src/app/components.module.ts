import { NgModule } from "@angular/core";
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MaterialModule } from './material.module';
import { MenuItemModalComponent } from './menu-item-modal/menu-item-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MenuItemModalComponent],
  exports: [MenuItemModalComponent],
  imports: [RoundProgressModule, MaterialModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule]
})
export class ComponentsModule { }
