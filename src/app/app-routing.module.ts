import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FinderComponent} from "./finder/finder.component";
import {BookmarksComponent} from "./bookmarks/bookmarks.component";
import {BookmarksType} from "./app.component";
import {NotepadComponent} from "./notepad/notepad.component";
import {ServerComponent} from "./server/server.component";
import {PlayingCardsComponent} from "./playing-cards/playing-cards.component";

const routes: Routes = [
  { path: '', component: FinderComponent},
  { path: 'bookmarks', component: BookmarksComponent, data: {bookmarksType: BookmarksType.STANDARD_BOOKMARKS}},
  { path: 'unique-bookmarks', component: BookmarksComponent, data: {bookmarksType: BookmarksType.UNIQUE_BOOKMARKS}},
  { path: 'notepad', component: NotepadComponent},
  { path: 'server', component: ServerComponent},
  { path: 'playing-cards', component: PlayingCardsComponent},
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
