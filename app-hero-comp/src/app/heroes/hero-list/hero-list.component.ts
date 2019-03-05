import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
  /*  heroes: {
    heroName: String;
    heroHeight: Number;
    heroType: Boolean;
    canFly: Boolean;
    fanFollowing: Number;
    superPowers: [];
    fightsWon: Number;
  }[]; */
  heroes: Hero[];
  constructor(private _heroService: HeroService) {}

  ngOnInit() {
    this.fetchHeroes();
  }

  fetchHeroes() {
    this._heroService.getSuperHeores().subscribe(heroes => {
      console.log(heroes);
      this.heroes = heroes;
    });
  }
}
