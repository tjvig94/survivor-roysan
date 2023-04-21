import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionComponent } from './pages/construction/construction.component';
import { WatchPageComponent } from './pages/watch-page/watch-page.component';

const routes: Routes = [
  { path: 'construction', component: ConstructionComponent },
  { path: 'watch', component: WatchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
