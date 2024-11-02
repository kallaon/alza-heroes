import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HeroService } from '../hero-service/hero.service';
import { ToastService } from '../toast-service/toast.service';

import { HeroExistsGuard } from './hero-exists.guard';

describe('heroExistsGuard', () => {
  let heroService: HeroService;
  let router: Router;
  let toastService: ToastService;

  const executeGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) =>
    TestBed.runInInjectionContext(() =>
      new HeroExistsGuard(heroService, router, toastService).canActivate(
        route,
      )
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService, Router, ToastService],
    });
    heroService = TestBed.inject(HeroService);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
