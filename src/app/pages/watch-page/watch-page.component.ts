import { Component, NO_ERRORS_SCHEMA, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { tap, Observable, map, of, catchError, throwError } from 'rxjs';
import { Season, Episode } from 'src/app/definitions/playlist-data.interface';
import { VideoService } from 'src/app/services/video-service/video.service';

@Component({
  selector: 'watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent implements OnInit {

  seasons$: Observable<Season[]>;
  episodes$: Observable<Episode[]>;
  currentEpisode$: Observable<string>;
  apiLoaded: boolean = false;

  constructor(
    private videoService: VideoService,
  ) {}

  ngOnInit() {
    this.fetchSeriesData();
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  fetchSeriesData() {
    this.seasons$ = this.videoService.fetchPlaylistsFromYT().pipe(
      map(({ data }) => this.mapSeasonData(data.items)),
      map((seasons: Season[]) => {
        seasons.pop();
        return seasons;
      }),
    );
  }

  mapSeasonData(seasons): Season[] {
    return seasons.map((i: any) => {
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

  setCurrentEpisode(videoId: string) {
    this.currentEpisode$ = this.episodes$.pipe(
      map((episodes) => {
        const episode = episodes.find(e => e.videoId === videoId) as Episode;
        return episode.videoId;
      }),
      catchError((err) => {
        return throwError(() => new Error(err))
      }),
    )
    // const episode = this.episodes.find(e => e.videoId === videoId);
    // if (episode) {
    //   this.currentEpisode$ = of(episode.videoId);
    //   this.currentEpisode = episode.videoId;
    // }
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
