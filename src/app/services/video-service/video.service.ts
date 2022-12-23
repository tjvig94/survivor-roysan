import { Injectable } from '@angular/core';
import env from '../../../../env';
import axios from '../axios/axios';
import { from, map, Observable, tap } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  fetchPlaylistsFromYT(): Observable<AxiosResponse> {
    const URL = `${env.playlistsURL}key=${env.apiKey}&channelId=${env.channelId}&part=snippet`;
    return from(axios.get(URL));
  }

  fetchPlaylistItemsFromYT(id: string): Observable<AxiosResponse> {
    const URL = `${env.playlistItemsURL}key=${env.apiKey}&part=snippet&playlistId=${id}&maxResults=20`
    return from(axios.get(URL));
  }
  
}