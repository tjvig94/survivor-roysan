import { Injectable } from '@angular/core';
import env from '../../../../env';
import axios from '../axios/axios';
import { from, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  playlistItemsMax: number = 20;

  fetchPlaylistsFromYT(): Observable<AxiosResponse> {
    const URL = `${env.playlistsURL}key=${env.apiKey}&channelId=${env.channelId}&part=snippet`;
    return from(axios.get(URL));
  }

  fetchPlaylistItemsFromYT(id: string): Observable<AxiosResponse> {
    const URL = `${env.playlistItemsURL}key=${env.apiKey}&part=snippet&playlistId=${id}&maxResults=${this.playlistItemsMax}`
    return from(axios.get(URL));
  }

  fetchEpisodeFromYT(id: string): Observable<AxiosResponse> {
    const URL = `${env.videoURL}key=${env.apiKey}&part=snippet,player&id=${id}`;
    return from(axios.get(URL));
  }  
}