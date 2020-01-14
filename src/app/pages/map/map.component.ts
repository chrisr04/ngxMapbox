import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/shared/models/marker.model';
import { LngLat } from 'mapbox-gl';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackMessageComponent } from 'src/app/shared/design/snack-message/snack-message.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  markers:Marker[];
  newMarker:boolean;

  constructor(private _snackBar:MatSnackBar) {
    this.markers = this.loadMarkers();
    this.newMarker = false;
  }

  ngOnInit() {
  }

  addMarker(lngLat:LngLat){
    if(this.newMarker){
      this.markers.push(new Marker(lngLat.lng, lngLat.lat));
      this.saveMarker();
      this.newMarker = false;
      this.openSnackBar('Marcador agregado','check_circle');
    }
  }

  deleteMarker(index:number){

    this.markers.splice(index,1);
    this.saveMarker();
    this.openSnackBar('Marcador eliminado','check_circle');
  }

  editMarker(data:any, marker:Marker){

      marker.title = data.info.title;
      marker.img = data.info.img;
      marker.description = data.info.description;
      marker.lng = data.marker._lngLat.lng;
      marker.lat = data.marker._lngLat.lat;
      this.saveMarker();
      this.openSnackBar('Marcador editado', 'check_circle');
  }

  changeCoords(data:any, marker:Marker){
      marker.lng = data._lngLat.lng;
      marker.lat = data._lngLat.lat;
      this.saveMarker();
  }

  saveMarker(){
    localStorage.setItem('markers',JSON.stringify(this.markers))
  }

  loadMarkers(){
    let markerStorage:string = localStorage.getItem('markers');
    if(markerStorage){
      return JSON.parse(markerStorage);
    }
    return [];
  }

  openSnackBar(message:string, icon:string) {
    this._snackBar.openFromComponent(SnackMessageComponent, {
      duration: 3*1000,
      data: {message: message, icon:icon}
    });
  }

}
