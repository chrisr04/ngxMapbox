import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MbxRouteService } from 'src/app/core/services/mbx-route.service';
import * as turf from '@turf/turf';

@Component({
  selector: 'mbx-route',
  templateUrl: './mbx-route.component.html',
  styleUrls: ['./mbx-route.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbxRouteComponent implements OnInit {


  @Input()
  idRoute:string;

  @Input()
  startCoords:Array<number>;

  @Input()
  endCoords:Array<number>;

  @Input()
  profile:string = 'driving';

  circle:Object;

  icon:Object;

  line:Object;

  arrows:Object;

  constructor(private rs:MbxRouteService) { }

  ngOnInit() {
    this.initRoutes();
  }

  initRoutes(){

    let destinationData =  turf.featureCollection([turf.point(this.endCoords)]);

    this.circle = {
      id: this.idRoute+'-circle',
      type: 'circle',
      source: {
        data: destinationData,
        type: 'geojson'
      },
      paint: {
        'circle-radius': 20,
        'circle-color': 'white',
        'circle-stroke-color': '#3887be',
        'circle-stroke-width': 3
      }
    }

    this.icon = {
      id: this.idRoute+'-symbol',
      type: 'symbol',
      source: {
        data: destinationData,
        type: 'geojson'
      },
      layout: {
        'icon-image': 'star',
        'icon-size': 0.45
      },
      paint: {
        'text-color': '#3887be'
      }
    }
    
    this.line = {
      id: this.idRoute+'-routeline-active',
      type: 'line',
      source:this.idRoute+'-route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': {
          base: 1,
          stops: [[12, 3], [22, 12]]
        }
      }
    };

    this.arrows = {
      id: this.idRoute+'-routearrows',
      type: 'symbol',
      source: this.idRoute+'-route',
      layout: {
        'symbol-placement': 'line',
        'text-field': '▶',
        'text-size': {
          base: 1,
          stops: [[12, 24], [22, 60]]
        },
        'symbol-spacing': {
          base: 1,
          stops: [[12, 30], [22, 160]]
        },
        'text-keep-upright': false
      },
      paint: {
        'text-color': '#3887be',
        'text-halo-color': 'hsl(55, 11%, 96%)',
        'text-halo-width': 2
      }
    };
  }

  newDropoff() {
    return this.rs.getOptimizedRoute(this.startCoords, this.endCoords, this.profile);
  }

}
