import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero } from '../../models/hero.model';
import { ToastType } from '../../models/toas.model';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService implements OnDestroy {
  private _heroesSubject = new BehaviorSubject<Hero[]>([]);
  heroes$: Observable<Hero[]> = this._heroesSubject.asObservable();
  private _subscription: Subscription = new Subscription();

  constructor(private readonly _toastService: ToastService) {}

  /**
   * Retrieves the list of all heroes as an Observable.
   * @returns An Observable of Hero objects array.
   */
  getHeroes(): Observable<Hero[]> {
    return this.heroes$;
  }

  /**
   * Retrieves a hero by its ID as an Observable.
   * @param id - The ID of the hero to retrieve.
   * @returns An Observable of the Hero object if found, otherwise undefined.
   */
  getHero(id: number): Observable<Hero | undefined> {
    if (!this._isValidId(id)) {
      this._toastService.showToast('Invalid ID', ToastType.Error);
      return new BehaviorSubject<Hero | undefined>(undefined).asObservable();
    }
    return this.heroes$.pipe(
      map((heroes) => heroes.find((hero) => hero.id === id))
    );
  }

  /**
   * Adds a new hero to the list.
   * @param hero - The Hero object to add.
   */
  addHero(hero: Hero): void {
    if (!this._isValidHero(hero)) {
      this._toastService.showToast('Invalid hero object', ToastType.Error);
      return;
    }
    if (this._heroesSubject.value.some((h) => h.id === hero.id)) {
      this._toastService.showToast(
        'Hero with this ID already exists',
        ToastType.Error
      );
      return;
    }

    const updatedHeroes = [...this._heroesSubject.value, hero];
    this._heroesSubject.next(updatedHeroes);
    this._toastService.showToast('Hero added successfully', ToastType.Success);
  }

  /**
   * Updates an existing hero.
   * @param updatedHero - The Hero object with updated information.
   */
  updateHero(updatedHero: Hero): void {
    if (!this._isValidHero(updatedHero)) {
      this._toastService.showToast('Invalid hero object', ToastType.Error);
      return;
    }

    const heroes = this._heroesSubject.value;
    const index = heroes.findIndex((hero) => hero.id === updatedHero.id);

    if (index === -1) {
      this._toastService.showToast('Hero not found', ToastType.Error);
      return;
    }

    const updatedHeroes = [...heroes];
    updatedHeroes[index] = updatedHero;
    this._heroesSubject.next(updatedHeroes);
    this._toastService.showToast(
      'Hero updated successfully',
      ToastType.Success
    );
  }

  /**
   * Deletes a hero by its ID.
   * @param id - The ID of the hero to delete.
   */
  deleteHero(id: number): void {
    if (!this._isValidId(id)) {
      this._toastService.showToast('Invalid ID', ToastType.Error);
      return;
    }

    const heroes = this._heroesSubject.value;
    const initialLength = heroes.length;
    const updatedHeroes = heroes.filter((hero) => hero.id !== id);

    if (updatedHeroes.length === initialLength) {
      this._toastService.showToast('Hero not found', ToastType.Error);
      return;
    }

    this._heroesSubject.next(updatedHeroes);
    this._toastService.showToast(
      'Hero deleted successfully',
      ToastType.Success
    );
  }

  /**
   * Cleans up resources on destroy.
   */
  ngOnDestroy(): void {
    this._subscription.unsubscribe(); // Unsubscribe to prevent memory leaks
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
   * @param hero - The hero object to validate.
   * @returns `true` if the hero is valid, `false` otherwise.
   */
  private _isValidHero(hero: Hero): boolean {
    return this._isValidId(hero.id) && !!hero.name?.trim();
  }
}
