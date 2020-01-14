import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'dialog-marker',
  templateUrl: './dialog-marker.component.html',
  styleUrls: ['./dialog-marker.component.css']
})
export class DialogMarkerComponent implements OnInit {

  form:FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogMarkerComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private fb:FormBuilder) {

            this.form = this.fb.group({
              title: data.title,
              img: data.img,
              description: data.description
            })

  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveChanges(){
    this.dialogRef.close(this.form.value);
  }
}
