import { NgModule } from '@angular/core';
import { MbxPopupService } from './services/mbx-popup.service';
import { MbxRouteService } from './services/mbx-route.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    MbxPopupService,
    MbxRouteService
  ]
})
export class CoreModule { }
