import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WallboardPage } from './wallboard.page';
import { ComponentsModule } from 'src/app/components.module';
import { MaterialModule } from 'src/app/material.module';
import { DevExtremesModule } from 'src/app/devextremes.module';

const routes: Routes = [
  {
    path: '',
    component: WallboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MaterialModule,
    DevExtremesModule,
    ReactiveFormsModule
  ],
  declarations: [WallboardPage]
})
export class WallboardPageModule { }
