import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsModuleRoutingModule } from './details-module-routing.module';
import { DetailsComponent } from './component/details/details.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api/api.service';
import { RouteGuard } from '../route.guard';


@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    DetailsModuleRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService, RouteGuard],

})
export class DetailsModuleModule { }
