import { Component } from '@angular/core';
import { tap, Observable, map, of } from 'rxjs';
import { Playlist, Video } from 'src/app/definitions/playlist-data.interface';
import { VideoService } from 'src/app/services/video-service/video.service';

@Component({
  selector: 'watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent {

  playlists: Playlist[] = [];
  playlists$: Observable<Playlist[]> = of([])

  videos: Video[] = [];
  videos$: Observable<Video[]> = of([]);

  constructor(
    private videoService: VideoService
  ) {
    this.fetchPlaylistData();
  }

  fetchPlaylistData(): void {
    this.playlists$ = this.videoService.fetchPlaylistsFromYT().pipe(
      map(({ data }) => this.mapPlaylistData(data)),
      tap((playlists: Playlist[]) => this.playlists = playlists),
    );
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

  fetchPlaylistItems(id: string): void {
      this.videos$ = this.videoService.fetchPlaylistItemsFromYT(id).pipe(
        map(response => this.mapPlaylistItemData(response)),
        tap((videos: Video[]) => this.videos = videos),
      )
  }

  mapPlaylistItemData(response: any): Video[] {
    return response.data.items.map((video: any) => {
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        videoId: video.id,
        thumbnail: video.snippet.thumbnails.standard,
      }
    })
  }

}
