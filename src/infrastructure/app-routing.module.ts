import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/feature/home/pages/home.component';
import { HistoryComponent } from '../app/modules/feature/history/pages/history.component';
import { AccountComponent } from "../app/modules/feature/account/pages/account/account.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'account', component: AccountComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
