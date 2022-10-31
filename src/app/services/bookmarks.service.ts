import {Injectable} from '@angular/core';
import {ImageData} from "../finder/finder.component";
import {Subject} from "rxjs";
import {BookmarksType} from "../app.component";
import {NotesModel} from "../notepad/notepad.component";


@Injectable({
  providedIn: 'root'
})

export class BookmarksService {
  public deleteBookmarkEvent: Subject<boolean> = new Subject<boolean>();
  public updateNotesEvent: Subject<boolean> = new Subject<boolean>();
  public mainPath = 'bookmarks';
  public uniquePath = 'unique_bookmarks';
  public notePath = 'notes';
  public bookmarksType: BookmarksType = BookmarksType.STANDARD_BOOKMARKS;

  constructor() {
  }

  public getItemFromLocalStorage<TModel>(bookmarksType: BookmarksType | null, path?: string): TModel[]{
    let allItems: string | null = '';
    if(bookmarksType){
      allItems = localStorage.getItem(this.bookmarksType === BookmarksType.STANDARD_BOOKMARKS ? this.mainPath: this.uniquePath);
    }
    if (!bookmarksType && path){
      allItems = localStorage.getItem(path);
    }
    if (allItems) {
      return JSON.parse(allItems);
    }
    return [];
  }

  public saveLocalStorage<TModel>(data: TModel[], path?: string): void {

    if(!path){
      localStorage.setItem(this.bookmarksType === BookmarksType.STANDARD_BOOKMARKS ? this.mainPath: this.uniquePath, JSON.stringify(data));
    }
    if (path){
      localStorage.setItem(this.notePath, JSON.stringify(data));
    }

  }

  public addToBookmarks(card: ImageData): boolean {
    const arr = this.getItemFromLocalStorage<ImageData>(this.bookmarksType);
    arr.push(card);
    this.saveLocalStorage<ImageData>(arr);
    return true;
  }

  public deleteBookmarks(card: ImageData): boolean {
    let arr = this.getItemFromLocalStorage<ImageData>(this.bookmarksType);
    arr = arr.filter((item) => item.imageName !== card.imageName);
    this.saveLocalStorage<ImageData>(arr);
    this.deleteBookmarkEvent.next(true);
    return false;
  }

  public searchInBookmarks(card: ImageData): boolean {
    let arr = this.getItemFromLocalStorage<ImageData>(this.bookmarksType);
    let response = false;
    if (arr.length > 0) {
      arr.forEach((val) => {
        if (val?.imageName === card?.imageName) {
          response = true;
        }
      });
    }
    return response
  }

  public addToNotes(note: NotesModel, isCreated: boolean): boolean {
    const arr = this.getItemFromLocalStorage<NotesModel>(null, this.notePath);
    if (isCreated){
      arr.push(note);
    }else{
      arr.forEach(item =>{
        if(item.title === note.title){
          item = note;
        }
      })
    }
    this.saveLocalStorage<NotesModel>(arr, this.notePath);
    this.updateNotesEvent.next(true)
    return true;
  }

  public deleteNotes(note: NotesModel): boolean {
    let arr = this.getItemFromLocalStorage<NotesModel>(null, this.notePath);
    arr = arr.filter((item) => item.title !== note.title);
    this.saveLocalStorage<NotesModel>(arr, this.notePath);
    this.updateNotesEvent.next(true);
    return false;
  }
}
