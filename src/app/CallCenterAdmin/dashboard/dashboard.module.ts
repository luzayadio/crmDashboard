import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsModule } from 'src/app/components.module';
import { DevExtremesModule } from 'src/app/devextremes.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ComponentsModule,
    DevExtremesModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule { }
