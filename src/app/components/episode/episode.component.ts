import { Component, Input } from '@angular/core';

@Component({
  selector: 'episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent {

  @Input() thumbnail: string = '';
  @Input() videoId: string = '';
  @Input() alt: string = '';

}
