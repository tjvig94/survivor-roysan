import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';
import { ConstructionComponent } from './pages/construction/construction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { EpisodeComponent } from './components/episode/episode.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PlayerComponent } from './components/player/player.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  declarations: [
    AppComponent,
    WatchPageComponent,
    ConstructionComponent,
    EpisodeComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PortalModule,
    MatSelectModule,
    YouTubePlayerModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
