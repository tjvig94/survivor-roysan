import { Injectable } from '@angular/core';
import env from '../../../../env';
import axios from '../axios/axios';
import { from, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  fetchPlaylists(): Observable<AxiosResponse> {
    const URL = `${env.playlistsURL}key=${env.apiKey}&channelId=${env.channelId}&part=snippet`;
    return from(axios.get(URL));
  }
  
}
