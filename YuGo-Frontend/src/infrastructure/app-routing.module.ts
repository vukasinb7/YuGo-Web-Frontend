import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/modules/feature/home/pages/home.component';
import { HistoryComponent } from '../app/modules/feature/history/pages/history.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'history', component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
