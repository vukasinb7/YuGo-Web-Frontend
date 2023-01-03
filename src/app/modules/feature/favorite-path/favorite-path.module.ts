import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { FavoritePathComponent } from './pages/favorite-path.component';
import { FavoritePathCardComponent } from './components/favorite-path-card/favorite-path-card.component';
import { FavoritePathDetailedCardComponent } from './components/favorite-path-detailed-card/favorite-path-detailed-card.component';
import { FavoritePathInputComponent } from '../history/components/favorite-path-input/favorite-path-input.component';

@NgModule({
  declarations: [
    FavoritePathComponent,
    FavoritePathCardComponent,
    FavoritePathDetailedCardComponent,
    FavoritePathInputComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    FavoritePathComponent],
})
export class FavoritePathModule { }
