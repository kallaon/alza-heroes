import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { HeroService } from '../../services/hero-service/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private readonly _heroService: HeroService) {}

  ngOnInit(): void {
    this.getTopHeroes();
  }

  /**
   * Retrieves the top heroes from the hero service and assigns them to the `heroes` property.
   * The top heroes are selected by taking a slice of the heroes array from index 0 to 4.
   */
  getTopHeroes(): void {
    this.heroes = this._heroService.getHeroes().slice(0, 4);
  }
}
