import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero-service/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let location: jasmine.SpyObj<Location>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getHero',
      'updateHero',
      'deleteHero',
    ]);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Location, useValue: locationSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtain hero on init if hero exists', () => {
    const expectedHero: Hero = { id: 1, name: 'Superman' };
    heroService.getHero.and.returnValue(of(expectedHero));

    component.ngOnInit();

    expect(heroService.getHero).toHaveBeenCalledWith(1);
    expect(component.hero).toEqual(expectedHero);
  });

  it('should navigate to home if hero does not exist', () => {
    heroService.getHero.and.returnValue(of(undefined));

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should navigate back when onGoBack is called', () => {
    component.onGoBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should save hero when onSave is called', () => {
    const hero: Hero = { id: 1, name: 'Superman' };
    component.hero = hero;
    component.editedHeroName = 'Batman';

    component.onSave();

    expect(heroService.updateHero).toHaveBeenCalledWith({
      id: 1,
      name: 'Batman',
    });
  });

  it('should delete hero and navigate to home when onDelete is called', () => {
    const hero: Hero = { id: 1, name: 'Superman' };
    component.hero = hero;

    component.onDelete();

    expect(heroService.deleteHero).toHaveBeenCalledWith(hero.id);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
