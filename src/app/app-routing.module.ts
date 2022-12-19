import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConstructionComponent } from './construction/construction.component';
import { WatchPageComponent } from './watch-page/watch-page.component';

const routes: Routes = [
  { path: 'construction', component: ConstructionComponent },
  { path: 'watch', component: WatchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
