import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { ToastType } from '../../models/toas.model';
import { HeroService } from '../hero-service/hero.service';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class HeroExistsGuard implements CanActivate {
  constructor(
    private readonly _heroService: HeroService,
    private readonly _router: Router,
    private readonly _toastService: ToastService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const heroId = Number(route.paramMap.get('id'));
    const hero = this._heroService.getHero(heroId);

    if (!hero) {
      this._toastService.showToast('Bad hero ID, such Hero does not exists', ToastType.Error);
      return this._router.createUrlTree(['/']);
    }
    return true;
  }
}
