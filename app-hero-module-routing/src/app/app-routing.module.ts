import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from "./heroes/heroes.component";
import { HeroListComponent } from "./heroes/hero-list/hero-list.component";
import { HeroDetailComponent } from "./heroes/hero-detail/hero-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

/* const routes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'heroes/new', component: HeroDetailComponent }
]; */
const routes: Routes = [
  // {path : 'heroes', component : HeroesComponent},// ?Eagerly Loading
  { path: "heroes", loadChildren: "./heroes/heroes.module#HeroesModule" }, // ? Lazy Loading
  // {
  //   path: "",
  //   redirectTo: "",
  //   pathMatch: "full"
  // }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
