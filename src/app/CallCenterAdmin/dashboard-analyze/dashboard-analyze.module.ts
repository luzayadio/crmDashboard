import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DashboardAnalyzePage } from './dashboard-analyze.page';
import { DevExtremesModule } from 'src/app/devextremes.module';
import { ComponentsModule } from 'src/app/components.module';
import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardAnalyzePage
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
  declarations: [DashboardAnalyzePage]
})
export class DashboardAnalyzePageModule { }
