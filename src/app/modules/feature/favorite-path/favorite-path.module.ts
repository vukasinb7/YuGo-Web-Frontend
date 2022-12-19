import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import { FavoritePathComponent } from './pages/favorite-path.component';
import { FavoritePathCardComponent } from './components/favorite-path-card/favorite-path-card.component';

@NgModule({
  declarations: [
    FavoritePathComponent,
    FavoritePathCardComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports:[
    FavoritePathComponent,
    FavoritePathCardComponent,],
})
export class FavoritePathModule { }
