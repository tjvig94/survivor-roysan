import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tap, map, Observable } from 'rxjs';
import { Playlist, Video } from './definitions/playlist-data.interface';
import { VideoService } from './services/video-service/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // feature toggle - set to true before pushing changes!
  underConstruction: boolean = true;
  playlists: Playlist[] = [];

  constructor(
    private router: Router,
    private videoService: VideoService,
  ) {
    this.assemblePlaylistData().subscribe((playlists) => {
      this.playlists = playlists;
    });
    if (this.underConstruction) {
      this.router.navigate(['/construction']);
      
    } else {
      this.router.navigate(['/watch'])
    };
  }

  assemblePlaylistData(): Observable<Playlist[]> {
    return this.videoService.fetchPlaylistsFromYT().pipe(
      map(({ data }) => this.mapPlaylistData(data))
    )
  }

  mapPlaylistData(data: any): Playlist[] {
    return data.items.map((i: any) => {
      return {
        id: i.id,
        title: i.snippet.title,
        description: i.snippet.description,
        thumbnail: i.snippet.thumbnails.standard,
      }
    })
  }

  // async assemblePlaylistItems(playlists: PlaylistData[]): Playlists {

  //   let videoData: Playlists = {
  //     playlists: []
  //   };

  //   playlists.forEach(async pl => {
  //     const playlistItems = await this.videoService.fetchPlaylistItemsFromYT(pl.id);
  //     const trimmedData: Playlists = {

  //     }
  //   })
  // }

}
