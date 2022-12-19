import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // feature toggle - set to true before pushing changes!
  underConstruction: boolean = true;

  constructor(private router: Router) {
    if (this.underConstruction) {
      this.router.navigate(['/construction'])
    } else {
      this.router.navigate(['/watch'])
    };
  }

}
