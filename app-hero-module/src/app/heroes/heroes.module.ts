import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeroesComponent } from "./heroes.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HeroListComponent } from "./hero-list/hero-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent, HeroListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [],
  providers: []
})
export class HeroesModule {}
