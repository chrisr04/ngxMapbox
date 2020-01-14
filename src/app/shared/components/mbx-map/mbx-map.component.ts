import { Component, AfterViewInit, ContentChildren, QueryList, Output, EventEmitter, OnDestroy, Input, ChangeDetectionStrategy, NgZone, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Map, NavigationControl, LngLat, Marker } from 'mapbox-gl'
import * as turf from '@turf/turf';
import { MbxMarkerComponent } from '../mbx-marker/mbx-marker.component';
import { Subscription } from 'rxjs';
import { pairwise, pluck, startWith, first } from 'rxjs/operators'
import { MbxRouteComponent } from '../mbx-route/mbx-route.component';

@Component({
  selector: 'mbx-map',
  templateUrl: './mbx-map.component.html',
  styleUrls: ['./mbx-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MbxMapComponent implements AfterViewInit, OnDestroy {

  map:Map;

  watcherPosition:any;

  @Input()
  idMap:string;

  @Input()
  coords:Array<number> = [-74.2061927, 11.2434401];

  @Input()
  zoom:number

  @Input()
  currentLocation:boolean;

  @ContentChildren(MbxMarkerComponent)
  markers:QueryList<MbxMarkerComponent>;

  @ContentChildren(MbxRouteComponent)
  routes:QueryList<MbxRouteComponent>;

  @Output()
  loadMap:EventEmitter<Map>;

  @Output()
  clickMap:EventEmitter<LngLat>;

  markerSub:Subscription;

  routeSub:Subscription;

  constructor(private ngZone:NgZone) {

    this.map = null;
    this.loadMap = new EventEmitter<Map>();
    this.clickMap = new EventEmitter<LngLat>();
    this.markerSub = null;
  }

  ngAfterViewInit(){

    this.initMap();

    // Listen for dynamic markers
    this.markerSub = this.changeMarkers().subscribe(([prev, curr])=>{

            let newMarkers:MbxMarkerComponent[] = curr.filter((markerElem:MbxMarkerComponent) => prev.indexOf(markerElem) < 0 );

            newMarkers.forEach(markerElem => {
              markerElem.marker.addTo(this.map);
            });   
    });

    // Listen for dynamic routes
    this.routeSub = this.changeRoutes().subscribe(([prev, curr])=>{

          let newRoutes:MbxRouteComponent[] = curr.filter((routeElem:MbxRouteComponent) => prev.indexOf(routeElem) < 0 );
               
          newRoutes.forEach(routeElem => {
            this.initRoutes(routeElem);
          });
    });
  }

  initMap(){

    // staring map
    this.map = new Map({
      container: this.idMap,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coords,
      zoom: this.zoom,
      accessToken: environment.mapbox.accessToken
    });

    if(this.currentLocation){
      this.getCurrentLocation();
    }

    this.map.addControl(new NavigationControl());

    this.map.loadImage('data:image/png;base64,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',
        (error, image) => {
          if (error) throw error;
          this.map.addImage('star', image);
        }
    );

    // events
    this.map.on('load', (data:any)=>{  

      // add static routes
      this.routes.toArray().forEach(routeElem => {
        this.initRoutes(routeElem);
      });

      // add static markers
      this.markers.toArray().forEach(markerElem => {
        markerElem.marker.addTo(this.map);
      });

      this.loadMap.emit(data.target)
    
    });

    this.map.on('click', (data:any)=>{
        this.clickMap.emit(data.lngLat);
    });
  }

  initRoutes(route:any){

    const marker = document.createElement('div');
    marker.classList.add('start-marker');

    // Create start marker
    const startMarker = new Marker(marker)
      .setLngLat(route.startCoords)
      .addTo(this.map);

    this.map.addSource((route.idRoute+'-route'),{
      type: 'geojson',
      data: turf.featureCollection([])
    });

    this.map.addLayer(route.line,'road-label');
    this.map.addLayer(route.arrows,'road-label');
    this.map.addLayer(route.circle);
    this.map.addLayer(route.icon);

    this.ngZone.runOutsideAngular(()=>{

        route.newDropoff().pipe(first()).subscribe((data: any) => {

            if (data.trips[0]) {
              let routeGeoJSON = turf.featureCollection([turf.feature(data.trips[0].geometry)]);
              this.map.getSource(route.idRoute+'-route').setData(routeGeoJSON);
            }

        }, (error) => {
            console.log(error);
        });  
    });
  }

  getCurrentLocation(){

    if(navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        // get current coords   
        this.coords[0] = position.coords.longitude;
        this.coords[1] = position.coords.latitude;

        // go to the user current location
        this.map.flyTo({
          center: this.coords
        });

      },(error)=>{
          switch (error.code) {
            case 3:
              console.log("deal with timeout");
              break;
            case 2:
              console.log("device can't get data");
              break;
            case 1:
              console.log("user said no");
              break;
          }
      });

      // watcher current position
      this.watcherPosition = navigator.geolocation.watchPosition((position) => {
          this.coords[0] = position.coords.longitude;
          this.coords[1] = position.coords.latitude;
      });
    }
  }

  clearWatcherPosition(){
    navigator.geolocation.clearWatch(this.watcherPosition);
  }

  changeMarkers(){

    return this.markers.changes.pipe(
            startWith({_results:this.markers.toArray()}), 
            pluck('_results'), 
            pairwise());
  }

  changeRoutes(){

    return this.routes.changes.pipe(
      startWith({_results:this.routes.toArray()}), 
      pluck('_results'), 
      pairwise());
  }

  ngOnDestroy(){

    this.markerSub.unsubscribe();
    this.routeSub.unsubscribe();
    this.clearWatcherPosition();
  }

}