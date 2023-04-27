import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { RouterModule, Routes } from '@angular/router';
import { TopbarComponent } from 'src/app/layouts/topbar/topbar.component';
import { TinderSwiperComponent } from '@components/tinder-swiper/tinder-swiper.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];


@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    TopbarComponent,
    TinderSwiperComponent
  ]
})

export class HomeModule {}
