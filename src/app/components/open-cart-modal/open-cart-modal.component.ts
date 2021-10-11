import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-open-cart-modal',
  templateUrl: './open-cart-modal.component.html',
  styleUrls: ['./open-cart-modal.component.scss']
})
export class OpenCartModalComponent implements OnInit {

  constructor(public stateService: StateService, private router: Router, public dialogRef: MatDialogRef<OpenCartModalComponent>) { }

  ngOnInit(): void {
  }

  onOrderClicked() {
    this.router.navigate(["order"]);
    this.dialogRef.close();
  }

  onContinueShoppingClicked() {
    this.dialogRef.close();
  }
}
