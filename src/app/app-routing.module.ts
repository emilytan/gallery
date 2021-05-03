import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details-module/component/details/details.component';
import { HomeComponent } from './home-module/component/home/home.component';
import { RouteGuard } from './route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail', redirectTo: 'home' },
  {
    path: 'detail/:id',
    canActivate: [RouteGuard],
    loadChildren: () =>
      import('../app/details-module/details-module.module').then((m) => m.DetailsModuleModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
