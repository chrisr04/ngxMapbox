import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignModule } from './design/design.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MbxMapComponent } from './components/mbx-map/mbx-map.component';
import { MbxMarkerComponent } from './components/mbx-marker/mbx-marker.component';
import { MbxPopupComponent } from './components/mbx-popup/mbx-popup.component';
import { MbxRouteComponent } from './components/mbx-route/mbx-route.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MbxMapComponent,
    MbxMarkerComponent,
    MbxRouteComponent,
    MbxPopupComponent
  ],
  entryComponents:[
    MbxPopupComponent
  ],
  imports: [
    CommonModule,
    DesignModule
  ],
  exports: [
    DesignModule,
    NavbarComponent,
    MbxMapComponent,
    MbxMarkerComponent,
    MbxRouteComponent,
    MbxPopupComponent
  ]
})
export class SharedModule { }
