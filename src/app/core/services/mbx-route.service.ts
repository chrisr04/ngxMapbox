import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class MbxRouteService {

  public keepTrack = [];
  public garbageIndex: any;
  public lastAtGarbage = 0;
  private url = 'https://api.mapbox.com/optimized-trips/v1/mapbox';
  private accessToken = environment.mapbox.accessToken;

  constructor(private http:HttpClient) { }

  getOptimizedRoute(startCoords:Array<number>, endCoords:Array<number>, profile:string) {

    const coordinates = [startCoords, endCoords];

    const params = new HttpParams()
        .set('overview','full')
        .set('steps','true')
        .set('annotations','duration,distance,speed')
        .set('geometries','geojson')
        .set('source','first')
        .set('destination','last')
        .set('roundtrip','false')
        .set('language','es')
        .set('access_token',this.accessToken)

    return this.http.get(`${this.url}/${profile}/${coordinates.join(';')}`,{params});
  }
}
