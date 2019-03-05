import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from "./heroes.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HeroListComponent } from "./hero-list/hero-list.component";

const heroesRoutes: Routes = [
  {
    path: "hero",
    component: HeroListComponent
  },
  {
    path: "hero/new",
    component: HeroDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {}
