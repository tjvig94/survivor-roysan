import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() videoId: string = '';
  loaded: boolean = false;

  ngOnInit() {
    if (!this.loaded) {
      const tag = document.createElement('script');
      tag.src = `https://www.youtube.com/iframe_api`;
      document.body.appendChild(tag);
      this.loaded = true;
    }
  }
}
