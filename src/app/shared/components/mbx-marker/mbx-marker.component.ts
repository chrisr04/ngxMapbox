import { Component, OnInit, AfterViewInit, Input, Output, ElementRef,  EventEmitter, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Marker, Popup } from 'mapbox-gl'
import { MbxPopupComponent } from '../mbx-popup/mbx-popup.component';
import { MbxPopupService } from 'src/app/core/services/mbx-popup.service';

@Component({
  selector: 'mbx-marker',
  templateUrl: './mbx-marker.component.html',
  styleUrls: ['./mbx-marker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbxMarkerComponent implements OnInit, AfterViewInit, OnDestroy {
  
  marker:Marker;

  @Input()
  coords:Array<number>;

  @Input()
  popup:boolean = true;

  @Input()
  title:string;

  @Input()
  description:string;

  @Input()
  img:string;

  @Input()
  draggable:boolean;

  @Output()
  deleteMarker:EventEmitter<Marker>;

  @Output()
  editMarker:EventEmitter<Object>;

  @Output()
  dragStartMarker:EventEmitter<Marker>;

  @Output()
  dragMarker:EventEmitter<Marker>;

  @Output()
  dragEndMarker:EventEmitter<Marker>;

  deletePopup:EventEmitter<boolean>;

  editPopup:EventEmitter<Object>;

  constructor(private elRef:ElementRef, private ps:MbxPopupService) { 
    this.draggable = false;
    this.deleteMarker = new EventEmitter<Marker>();
    this.editMarker = new EventEmitter<Object>();
    this.dragStartMarker = new EventEmitter<Marker>();
    this.dragMarker = new EventEmitter<Marker>();
    this.dragEndMarker = new EventEmitter<Marker>();
  }

  ngOnInit() {
    this.elRef.nativeElement.hidden = true; 
  }

  ngAfterViewInit(){
    this.initMarker();
    this.initPopup();
  }

  initPopup(){

    if(this.popup){
      
      // Inject component
      let popupContent = this.ps.injectComponent(MbxPopupComponent,
         (popup:MbxPopupComponent) => {
          popup.title = this.title;
          popup.description = this.description;
          popup.img = this.img;
          this.deletePopup = popup.deleteMarker$;
          this.editPopup = popup.editMarker$;
        });

      // staring popup
      this.marker.setPopup(new Popup({ offset: 15 })
                  .setMaxWidth("300")
                  .setDOMContent(popupContent)
                  .setLngLat(this.marker.getLngLat()));    
        
      // events
      this.editPopup.subscribe((editedData:any)=>{
        if(editedData){
          this.editMarker.emit({marker: this.marker, info: editedData});
        }
      });

      this.deletePopup.subscribe((del:boolean)=>{
        if(del){
          this.deleteMarker.emit(this.marker);
          this.marker.remove();
        }
      });
    }
  }

  initMarker(){

    // staring marker
    this.marker = new Marker({
      draggable: this.draggable
    }).setLngLat(this.coords);

    // events
    this.marker.on('dragstart', (data:any)=>{
      this.dragStartMarker.emit(data.target);
    });

    this.marker.on('drag', (data:any)=>{
      this.dragMarker.emit(data.target);
    });  

    this.marker.on('dragend', (data:any)=>{
      this.dragEndMarker.emit(data.target);
    });  
  }

  ngOnDestroy(){
    this.editPopup.unsubscribe();
    this.deletePopup.unsubscribe();
  }
}