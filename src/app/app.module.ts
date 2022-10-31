import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MenubarModule} from "primeng/menubar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {FinderComponent} from './finder/finder.component';
import {BookmarksComponent} from './bookmarks/bookmarks.component';
import {SharedModule} from "./shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {BookmarksService} from "./services/bookmarks.service";
import {DialogModule} from "primeng/dialog";
import {ConfirmationService} from "primeng/api";
import { NotepadComponent } from './notepad/notepad.component';
import {ScrollPanelModule} from "primeng/scrollpanel";
import { NotepadEditorComponent } from './notepad/notepad-editor/notepad-editor.component';
import {EditorModule} from "primeng/editor";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ServerComponent } from './server/server.component';
import {ImageModule} from "primeng/image";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { PlayingCardsComponent } from './playing-cards/playing-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    FinderComponent,
    BookmarksComponent,
    NotepadComponent,
    NotepadEditorComponent,
    ServerComponent,
    PlayingCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    SharedModule,
    PaginatorModule,
    DialogModule,
    ScrollPanelModule,
    EditorModule,
    ReactiveFormsModule,
    ImageModule,
    ProgressSpinnerModule,
  ],
  providers: [BookmarksService, DialogService, DynamicDialogRef, DynamicDialogConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
