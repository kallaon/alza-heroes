import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeroExistsGuard } from '../../services/hero-exists-guard/hero-exists.guard';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: HeroDetailComponent,
    canActivate: [HeroExistsGuard],
  },
];

@NgModule({
  declarations: [HeroDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  providers: [HeroExistsGuard],
})
export class HeroDetailModule {}
