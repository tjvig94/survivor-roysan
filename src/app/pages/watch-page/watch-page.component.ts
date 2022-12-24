import { Component } from '@angular/core';
import { tap, Observable, map } from 'rxjs';
import { Playlist, Video } from 'src/app/definitions/playlist-data.interface';
import { VideoService } from 'src/app/services/video-service/video.service';

@Component({
  selector: 'watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent {

  playlists: Playlist[] = [];
  videos: Video[] = [];

  constructor(
    private videoService: VideoService
  ) {

    // initialize playlist data
    this.fetchPlaylistData().pipe(
      tap((playlists) => this.playlists = playlists),
    ).subscribe();
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
        map(response => this.mapPlaylistItemData(response)),
      )
  }

  mapPlaylistItemData(response: any): Video[] {
    return response.data.items.map((video: any) => {
      return {
        videoId: video.id,
        thumbnail: video.snippet.thumbnails.standard,
      }
    })
  }

}
