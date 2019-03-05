import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  bornHero: FormGroup;
  constructor(private _heroService: HeroService, private _router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.bornHero = new FormGroup({
      heroName: new FormControl(null, [Validators.required]),
      heroHeight: new FormControl(null, [Validators.required]),
      heroType: new FormControl(null, [Validators.required]),
      canFly: new FormControl(null, [Validators.required]),
      fanFollowing: new FormControl(null, [Validators.required]),
      superPowers: new FormControl(null, [Validators.required]),
      fightsWon: new FormControl(null, [Validators.required])
    });
  }
  onFormSubmitted() {
    const powers: String[] = [];

    powers.push(this.bornHero.value.superPowers.split(','));
    const clone = { ...this.bornHero.value, superPowers: powers };

    this._heroService
      .postSuperHero(clone)
      .subscribe(
        data => console.log(data),
        error => console.log(error),
        () => {}
      );

    this._router.navigate(['heroes']);
  }
}
