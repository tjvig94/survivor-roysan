import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { VideoService } from './services/video-service/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // feature toggle - set to true before pushing changes!
  underConstruction: boolean = true;

  constructor(
    private router: Router,
    private videoService: VideoService,
  ) {
    if (this.underConstruction) {
      this.router.navigate(['/construction']);
    } else {
      this.router.navigate(['/watch'])
    };
  }

}
