import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero-service/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let location: jasmine.SpyObj<Location>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getHero',
      'updateHero',
    ]);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should obtain hero on init', () => {
    const expectedHero: Hero = { id: 1, name: 'Superman' };
    heroService.getHero.and.returnValue(expectedHero);

    component.ngOnInit();

    expect(heroService.getHero).toHaveBeenCalledWith(1);
    expect(component.hero).toEqual(expectedHero);
  });

  it('should navigate back when onGoBack is called', () => {
    component.onGoBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should save hero when onSave is called', () => {
    const hero: Hero = { id: 1, name: 'Superman' };
    component.hero = hero;

    component.onSave();

    expect(heroService.updateHero).toHaveBeenCalledWith(hero);
  });

  it('should not save hero when onSave is called and hero is undefined', () => {
    component.hero = undefined;

    component.onSave();

    expect(heroService.updateHero).not.toHaveBeenCalled();
  });
});
