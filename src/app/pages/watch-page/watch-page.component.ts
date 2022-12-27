import { Component } from '@angular/core';
import { tap, Observable, map, of } from 'rxjs';
import { Season, Episode } from 'src/app/definitions/playlist-data.interface';
import { VideoService } from 'src/app/services/video-service/video.service';

@Component({
  selector: 'watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent {

  seasons$: Observable<Season[]> = of([]);
  episodes$: Observable<Episode[]> = of([]);
  episodes: Episode[] = [];
  currentEpisode$: Observable<Episode | undefined> = of(undefined);

  constructor(
    private videoService: VideoService,
  ) {
    this.fetchSeriesData();
  }

  fetchSeriesData(): void {
    this.seasons$ = this.videoService.fetchPlaylistsFromYT().pipe(
      map(({ data }) => this.mapSeasonData(data)),
      tap((seasons) => seasons.pop()),
    );
  }

  mapSeasonData(data: any): Season[] {
    return data.items.map((i: any) => {
      return {
        id: i.id,
        title: i.snippet.title,
        description: i.snippet.description,
        thumbnail: i.snippet.thumbnails.standard,
      }
    })
  }

  fetchEpisodeData(id: string): void {
      this.episodes$ = this.videoService.fetchPlaylistItemsFromYT(id).pipe(
        map(response => this.mapEpisodeData(response)),
        tap((episodes) => this.episodes = episodes)
      )
  }

  mapEpisodeData(response: any): Episode[] {
    return response.data.items.map((video: any) => {
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        videoId: video.snippet.resourceId.videoId,
        thumbnail: video.snippet.thumbnails.standard,
      }
    })
  }

  fetchEpisodeToWatch(videoId: string): void {
    this.currentEpisode$ = of(this.episodes.find(e => e.videoId === videoId)).pipe(
      map(episode => {
        if (episode) {
          episode.videoId = `https://youtube.com/embed/${videoId}`
        };
        return episode;
      }),
    )
  }

  // mapCurrentEpisodeData(response: AxiosResponse): CurrentEpisode {
  //   const data = response.data.items[0].snippet;
  //   const player = response.data.items[0].player;
  //   return {
  //     title: data.title,
  //     description: data.description,
  //     player: player.embedHtml,
  //     thumbnail: data.thumbnails.standard,
  //   }
  // }

}
