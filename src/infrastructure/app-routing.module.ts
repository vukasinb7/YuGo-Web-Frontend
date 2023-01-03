import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/feature/home/pages/home.component';
import { HistoryComponent } from '../app/modules/feature/history/pages/history.component';
import { AccountComponent } from "../app/modules/feature/account/pages/account/account.component";
import {FavoritePathComponent} from "../app/modules/feature/favorite-path/pages/favorite-path.component";
import {LoginGuard} from "../app/modules/core/guards/login.guard";
import {
  AdminUsersAccountsComponent
} from "../app/modules/feature/account/pages/admin-users-accounts/admin-users-accounts.component";
import {AdminGuard} from "../app/modules/core/guards/admin.guard";
import {ProfileGuard} from "../app/modules/core/guards/profile.guard";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'history/:role/:userId', component: HistoryComponent, canActivate: [LoginGuard, ProfileGuard]},
  {path: 'account/:role/:userId', component: AccountComponent, canActivate: [LoginGuard, ProfileGuard]},
  {path: 'users-accounts', component: AdminUsersAccountsComponent, canActivate: [LoginGuard, AdminGuard]},
  {path: 'favorite', component: FavoritePathComponent, canActivate: [LoginGuard]},
  {path: '**',  redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
