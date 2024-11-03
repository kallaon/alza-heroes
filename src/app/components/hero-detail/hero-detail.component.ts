import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { ToastType } from '../../models/toas.model';
import { HeroService } from '../../services/hero-service/hero.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero | undefined;
  editedHeroName: string = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private readonly _heroService: HeroService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _location: Location,
    private readonly _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this._obtainHeroByRouteId();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Navigates back to the previous location in the browser's history.
   * This method uses the Router to navigate to the homepage.
   */
  onGoBack(): void {
    this._location.back();
  }

  /**
   * Saves the current hero details by calling the updateHero method
   * from the hero service if the hero object is defined.
   */
  onSave(): void {
    if (this.hero) {
      this.hero.name = this.editedHeroName.trim();
      this._heroService.updateHero(this.hero);
    }
  }

  /**
   * Deletes the current hero and navigates back to the homepage.
   */
  onDelete(): void {
    if (this.hero) {
      this._heroService.deleteHero(this.hero.id);
      this._router.navigate(['/']);
    }
  }

  /**
   * Fetches the hero based on the route ID and assigns it to the component's `hero` property.
   * If the hero is not found, logs an error and navigates to the home page.
   * If there is an error during the fetch operation, logs the error.
   *
   * @private
   * @returns {void}
   */
  private _obtainHeroByRouteId(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));

    this._heroService
      .getHero(id)
      .pipe(take(1))
      .subscribe({
        next: (hero) => {
          if (hero) {
            this.hero = hero;
            this.editedHeroName = hero.name; // Initialize editedHeroName
          } else {
            this._router.navigate(['/']);
          }
        },
        error: (err) =>
          this._toastService.showToast(
            err.message || 'Failed to fetch heroes',
            ToastType.Error
          ),
      });
  }
}
