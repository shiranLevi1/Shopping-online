import { Component } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'Shopping online';
  
  constructor(public stateService: StateService) { }

  onActivate(event: any) {
    window.scroll(0, 0);
  }
}
