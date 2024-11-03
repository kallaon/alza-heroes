import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../../models/hero.model';
import { ToastType } from '../../models/toas.model';
import { HeroService } from '../../services/hero-service/hero.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly _heroService: HeroService,
    private readonly _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this._getTopHeroes();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Retrieves the top heroes (first 4) from the hero service and assigns them to `heroes`.
   */
  private _getTopHeroes(): void {
    this._subscription = this._heroService
      .getHeroes()
      .pipe(map((heroes) => heroes.slice(0, 4)))
      .subscribe({
        next: (topHeroes) => (this.heroes = topHeroes),
        error: (err) =>
          this._toastService.showToast(
            err.message || 'Failed to fetch heroes',
            ToastType.Error
          ),
      });
  }
}
