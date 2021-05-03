import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuard } from '../route.guard';
import { DetailsComponent } from './component/details/details.component';

const routes: Routes = [
  { path: '',  component: DetailsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsModuleRoutingModule { }
