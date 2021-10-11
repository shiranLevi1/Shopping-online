import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.scss']
})
export class NewPurchaseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewPurchaseComponent>) { }

  ngOnInit(): void {
  }

  onOkClicked() {
    this.dialogRef.close();
  }

}
