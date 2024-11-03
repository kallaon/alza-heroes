import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { ToastType } from '../../models/toas.model';
import { HeroService } from '../../services/hero-service/hero.service';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  newHeroName: string = '';
  heroes: Hero[] = [];

  constructor(
    private readonly _heroService: HeroService,
    private readonly _router: Router,
    private readonly _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this._getHeroes();
  }

  /**
   * Adds a new hero using the hero service and resets the input field.
   */
  /**
   * Adds a new hero using the hero service and resets the input field.
   */
  addHero(heroNameInput: NgModel): void {
    if (this.newHeroName.trim()) {
      const newHero: Hero = {
        id: this._generateHeroId(),
        name: this.newHeroName.trim(),
      };
      this._heroService.addHero(newHero);
      this.newHeroName = '';
      heroNameInput.reset();
      this._getHeroes();
    }
  }

  /**
   * Navigates to the detail page of the specified hero.
   * @param id - The ID of the hero.
   */
  goToHeroDetail(id: number): void {
    this._router.navigate(['/detail', id]);
  }

  /**
   * Generates a unique ID for a new hero.
   * @returns A unique hero ID.
   */
  private _generateHeroId(): number {
    if (this.heroes.length === 0) {
      return 1;
    }
    const lastHeroId = this.heroes[this.heroes.length - 1].id;
    return lastHeroId + 1;
  }

  /**
   * Fetches the list of heroes from the hero service.
   */
  private _getHeroes(): void {
    this._heroService.getHeroes().subscribe({
      next: (heroes) => (this.heroes = heroes),
      error: (err) =>
        this._toastService.showToast(
          err.message || 'Failed to fetch heroes',
          ToastType.Error
        ),
    });
  }
}
