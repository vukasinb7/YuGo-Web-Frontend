import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent {

  constructor(private dialogRef: MatDialogRef<PanicDialogComponent>) {
  }

  form:FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required])
  });

  submitForm(){
    this.dialogRef.close({message:this.form.controls["description"].value});
  }

}
