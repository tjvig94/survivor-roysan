import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
    
    // initialize playlist data
    this.fetchPlaylistData().subscribe((playlists) => {
      this.playlists = playlists; 
    });

    // redirect depending on feature flag
    if (this.underConstruction) {
      this.router.navigate(['/construction']);
    } else {
      this.router.navigate(['/watch'])
    };
  }

  fetchPlaylistData(): Observable<Playlist[]> {
    return this.videoService.fetchPlaylistsFromYT().pipe(
      map(({ data }) => this.mapPlaylistData(data)),
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

  fetchPlaylistItems(id: string): Observable<Video[]> {
      return this.videoService.fetchPlaylistItemsFromYT(id).pipe(
        map(({ data }) => this.mapPlaylistItemData(data.id)),
      )
  }

  mapPlaylistItemData(data: any): Video[] {
    return data.items.map((video: any) => {
      return {
        videoId: video.id,
        thumbnail: video.snippet.thumbnails.standard,
      }
    })
  }
}
