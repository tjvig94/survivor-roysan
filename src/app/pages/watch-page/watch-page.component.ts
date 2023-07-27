import { Component, NO_ERRORS_SCHEMA, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AxiosResponse } from 'axios';
import { tap, Observable, map, of } from 'rxjs';
import { Season, Episode } from 'src/app/definitions/playlist-data.interface';
import { VideoService } from 'src/app/services/video-service/video.service';

@Component({
  selector: 'watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent implements OnInit {

  seasons$: Observable<Season[]>;
  seasons: WritableSignal<Season[]> = signal([]);
  episodes$: Observable<Episode[]>;
  episodes: Episode[] = [];
  currentEpisode$: Observable<string> = of('');
  currentEpisode: string;
  apiLoaded: boolean = false;

  constructor(
    private videoService: VideoService,
  ) {}

  ngOnInit() {
    this.fetchSeriesData();
    this.currentEpisode$.subscribe((val) => {
      this.currentEpisode = ''
    })
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  fetchSeriesData() {
    this.seasons$ = this.videoService.fetchPlaylistsFromYT().pipe(
      map((response) => this.filterPrivateSeasons(response)),
      map((seasons) => this.mapSeasonData(seasons)),
    );
  }

  mapSeasonData(seasons): Season[] {
    return seasons.map((season: any) => {
      return {
        id: season.id,
        title: season.snippet.title,
        description: season.snippet.description,
        thumbnail: season.snippet.thumbnails.standard,
      }
    })
  }

  fetchEpisodeData(id: string): void {
      this.episodes$ = this.videoService.fetchPlaylistItemsFromYT(id).pipe(
        map(response => this.filterPrivateVideos(response)),
        map(videos => this.mapEpisodeData(videos)),
        tap((episodes) => this.episodes = episodes),
      )
  }

  mapEpisodeData(videos): Episode[] {
    return videos.map((video: any) => {
      return {
        title: video.snippet.title,
        description: video.snippet.description,
        videoId: video.snippet.resourceId.videoId,
        thumbnail: video.snippet.thumbnails.standard,
      }
    })
  }

  filterPrivateSeasons(response: AxiosResponse) {
    const wantedSeasons = [
      "Survivor Merrimack Madness",
      "Survivor Roysan Revival"
    ]
    return response.data.items.filter(season => wantedSeasons.includes(season.snippet.title))
  }

  filterPrivateVideos(response: AxiosResponse) {
    return response.data.items.filter(video => video.snippet.title !== "Private video");
  }

  fetchEpisodeToWatch(videoId: string): void {
    const episode = this.episodes.find(e => e.videoId === videoId);
    if (episode) {
      this.currentEpisode$ = of(episode.videoId);
      this.currentEpisode = episode.videoId;
    }
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
