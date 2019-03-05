import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private _http: HttpClient) {}
  // http://localhost:3000/api/heroes

  // RxJS -> Library which helps us to perform many operations & gives us many function to
  // perform Asynchronous tasks

  // Observable ->  The Week Magazine
  getSuperHeores(): Observable<Hero[]> {
    return this._http.get<Hero[]>('http://localhost:3000/api/heroes');
  }
  postSuperHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>('http://localhost:3000/api/heroes', hero);
  }
}
