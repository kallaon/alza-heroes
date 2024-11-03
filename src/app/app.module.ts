import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { ToastContainerComponent } from './components/toast-container-component/toast-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    ToastContainerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  // providers: [HeroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
