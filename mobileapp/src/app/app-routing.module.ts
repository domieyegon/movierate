import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ItemsComponent } from './item/items.component'
import { ItemDetailComponent } from './item/item-detail.component'
import { AuthComponent } from './auth/auth.component'
import { MovieListComponent } from './movie-list/movie-list.component'
import { MovieDetailsComponent } from './movie-details/movie-details.component'
import { MovieFormComponent } from './movie-form/movie-form.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'items', component: ItemsComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'login', component: AuthComponent },
  { path: 'movies', component:MovieListComponent },
  { path: 'movies/new', component:MovieFormComponent },
  { path: 'movies/:id', component:MovieDetailsComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
