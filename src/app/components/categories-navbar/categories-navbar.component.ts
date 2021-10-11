import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-categories-navbar',
  templateUrl: './categories-navbar.component.html',
  styleUrls: ['./categories-navbar.component.scss']
})
export class CategoriesNavbarComponent implements OnInit {

  constructor(public stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.onBtnAllClick();
  }

  onBtnAllClick() {
    this.stateService.categoryId = null;
    this.stateService.searchValue = null;
  }

  onCategoryBtnClick(event: any) {
    this.stateService.searchValue = null;
    this.stateService.categoryId = event.target.value;
  }


}
