import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { FavoritePathComponent } from './pages/favorite-path.component';
import { FavoritePathCardComponent } from './components/favorite-path-card/favorite-path-card.component';
import { FavoritePathDetailedCardComponent } from './components/favorite-path-detailed-card/favorite-path-detailed-card.component';

@NgModule({
  declarations: [
    FavoritePathComponent,
    FavoritePathCardComponent,
    FavoritePathDetailedCardComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    FavoritePathComponent],
})
export class FavoritePathModule { }
