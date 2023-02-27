import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IProducts } from './../../models/products';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  products!: IProducts[]
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { if (this.data) this.isNew = false }
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? '', [Validators.required]),
    price: new FormControl(this.data?.price ?? '', [Validators.required, Validators.pattern(/^[0-9]+(?!.)/)]),
    chip: new FormControl(this.data?.chip ?? ''),
    ssd: new FormControl(this.data?.ssd ?? ''),
    memory: new FormControl(this.data?.memory ?? ''),
    display: new FormControl(this.data?.display ?? ''),
  })
  isNew: boolean = true

  onNoClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: "./assets/images/hp.png",
      configure: {
        chip: this.myForm.value.chip,
        ssd: this.myForm.value.ssd,
        memory: this.myForm.value.memory,
        display: this.myForm.value.display,
      }
    }
    this.dialogRef.close(this.data)
  }
}
