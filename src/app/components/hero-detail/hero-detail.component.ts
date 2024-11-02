import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero-service/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private readonly _location: Location,
    private readonly _heroService: HeroService,
    private readonly _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._obtainHeroByRouteId();
  }

  /**
   * Navigates back to the previous location in the browser's history.
   * This method uses the Location service to perform the navigation.
   *
   * @returns {void}
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
      this._heroService.updateHero(this.hero);
    }
  }

  /**
   * Obtains the hero based on the ID from the current route.
   *
   * This method extracts the hero ID from the route parameters,
   * uses the HeroService to fetch the hero, and assigns it to the
   * component's `hero` property. If the hero is not found (i.e.,
   * the ID does not correspond to any hero), it logs an error
   * message and navigates to the homepage.
   *
   * @private
   * @returns {void}
   */
  private _obtainHeroByRouteId(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.hero = this._heroService.getHero(id);
  }
}
