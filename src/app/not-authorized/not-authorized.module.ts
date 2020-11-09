import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotAuthorizedPage } from './not-authorized.page';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  {
    path: '',
    component: NotAuthorizedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [NotAuthorizedPage]
})
export class NotAuthorizedPageModule { }
