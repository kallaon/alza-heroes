// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HeroService } from '../../services/hero-service/hero.service';
// import { HeroDetailComponent } from './hero-detail.component';
// import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: ':id', component: HeroDetailComponent }
// ];

// @NgModule({
//   declarations: [HeroDetailComponent],
//   providers: [HeroService],
//   imports: [
//     CommonModule,
//     RouterModule.forChild(routes),
//     FormsModule
//   ]
// })
// export class HeroDetailModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeroExistsGuard } from '../../services/hero-exists-guard/hero-exists.guard';
import { HeroService } from '../../services/hero-service/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  { path: ':id', component: HeroDetailComponent, canActivate: [HeroExistsGuard] }
];

@NgModule({
  declarations: [
    HeroDetailComponent // Declare HeroDetailComponent here
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [
    HeroService,      // Provide HeroService if not provided globally
    HeroExistsGuard   // Provide HeroExistsGuard here if not provided globally
  ]
})
export class HeroDetailModule { }
