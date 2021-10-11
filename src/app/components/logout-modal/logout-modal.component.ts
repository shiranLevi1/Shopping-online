import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent implements OnInit {

  constructor(private router: Router, public stateService: StateService, private dialogRef: MatDialogRef<LogoutModalComponent>) { }

  ngOnInit(): void {
  }

  onYesClicked() {
    localStorage.clear();
    this.stateService.isLoggedIn = false;
    this.stateService.isAdmin = false;
    this.router.navigate([""])

    this.dialogRef.close();
  }

  onNoClicked() {
    this.dialogRef.close();
  }
  
}
