import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/feature/home/pages/home.component';
import { HistoryComponent } from '../app/modules/feature/history/pages/history.component';
import { AccountComponent } from "../app/modules/feature/account/pages/account/account.component";
import {FavoritePathComponent} from "../app/modules/feature/favorite-path/pages/favorite-path.component";
import {LoginGuard} from "../app/modules/core/guards/login.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'history', component: HistoryComponent, canActivate: [LoginGuard]},
  {path: 'account', component: AccountComponent, canActivate: [LoginGuard]},
  {path: 'favorite', component: FavoritePathComponent, canActivate: [LoginGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
