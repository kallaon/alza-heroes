import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { ToastType } from '../../models/toas.model';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private _heroes: Hero[] = [
    { id: 1, name: 'Windstorm' },
    { id: 2, name: 'Bombasto' },
    { id: 3, name: 'Magneta' },
    { id: 4, name: 'Tornado' }
  ];

  constructor(private readonly _toastService: ToastService) { }

  /**
   * Retrieves the list of all heroes.
   * @returns An array of Hero objects.
   */
  getHeroes(): Hero[] {
    return this._heroes;
  }

  /**
   * Retrieves a hero by its ID.
   * @param id - The ID of the hero to retrieve.
   * @returns The Hero object if found, otherwise undefined.
   */
  getHero(id: number): Hero | undefined {
    if (!this._isValidId(id)) {
      console.error('Invalid ID');
      return undefined;
    }
    return this._heroes.find(hero => hero.id === id);
  }

  /**
   * Adds a new hero to the list.
   * @param hero - The Hero object to add.
   */
  addHero(hero: Hero): void {
    if (!this._isValidHero(hero)) {
      console.error('Invalid hero object');
      return;
    }
    if (this._heroes.some(h => h.id === hero.id)) {
      console.error('Hero with this ID already exists');
      return;
    }
    this._heroes.push(hero);
    this._toastService.showToast('Hero added successfully', ToastType.Success);
    console.log('Heroes', this.getHeroes());
  }

  /**
   * Updates an existing hero.
   * @param updatedHero - The Hero object with updated information.
   */
  updateHero(updatedHero: Hero): void {
    if (!this._isValidHero(updatedHero)) {
      console.error('Invalid hero object');
      return;
    }
    const index = this._heroes.findIndex(hero => hero.id === updatedHero.id);
    if (index === -1) {
      console.error('Hero not found');
      return;
    }
    this._heroes[index] = updatedHero;
    this._toastService.showToast('Hero updated successfully', ToastType.Success);
    console.log('Heroes', this.getHeroes());
  }

  /**
   * Deletes a hero by its ID.
   * @param id - The ID of the hero to delete.
   */
  deleteHero(id: number): void {
    if (!this._isValidId(id)) {
      console.error('Invalid ID');
      return;
    }
    const initialLength = this._heroes.length;
    this._heroes = this._heroes.filter(hero => hero.id !== id);
    if (this._heroes.length === initialLength) {
      console.error('Hero not found');
    }
  }

  /**
   * Checks if the given ID is valid.
   * @param id - The ID to check.
   * @returns True if the ID is valid, otherwise false.
   */
  private _isValidId(id: number): boolean {
    return Number.isInteger(id) && id > 0;
  }

  /**
   * Checks if the given hero object is valid.
   * A hero is considered valid if it has a valid ID and a non-empty name.
   *
   * @param hero - The hero object to validate.
   * @returns `true` if the hero is valid, `false` otherwise.
   */
  private _isValidHero(hero: Hero): boolean {
    return this._isValidId(hero.id) && !!hero.name?.trim();
  }
}