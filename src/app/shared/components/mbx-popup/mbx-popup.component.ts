import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMarkerComponent } from '../../design/dialog-marker/dialog-marker.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mbx-popup',
  templateUrl: './mbx-popup.component.html',
  styleUrls: ['./mbx-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MbxPopupComponent implements OnInit, OnDestroy {

  @Input()
  title:string;
  
  @Input()
  description:string;

  @Input()
  img:string = '';

  deleteMarker$:EventEmitter<boolean>;
  editMarker$:EventEmitter<Object>;
  dialogSub:Subscription;

  constructor(public dialog:MatDialog, private changeDetector:ChangeDetectorRef) {
      this.deleteMarker$ = new EventEmitter<boolean>();
      this.editMarker$ = new EventEmitter<Object>();
  } 

  ngOnInit() {
  }

  deleteMarker(){
    this.deleteMarker$.emit(true);
  }

  editMarker(){
    this.openDialog();
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(DialogMarkerComponent, {
      width: '450px',
      data: {title: this.title, description: this.description, img: this.img}
    });

   this.dialogSub = dialogRef.afterClosed().subscribe((result:any) => {

      if(result){
        this.title = result.title;
        this.description = result.description;
        this.img = result.img;
        this.changeDetector.markForCheck();
        this.editMarker$.emit(result);
      }
    });
  }

  ngOnDestroy(){
    this.dialogSub.unsubscribe();
  }

}
