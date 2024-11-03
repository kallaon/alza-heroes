import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { ToastContainerComponent } from './components/toast-container-component/toast-container.component';
import { HeroNameDirective } from './directives/hero-name.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    ToastContainerComponent,
    HeroNameDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  exports: [HeroNameDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
