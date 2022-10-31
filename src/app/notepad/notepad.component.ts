import {Component, inject, OnInit} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {NotepadEditorComponent} from "./notepad-editor/notepad-editor.component";
import {BookmarksService} from "../services/bookmarks.service";

export interface NotesModel{
  title: string;
  content?: string;
  createDate: Date;
}

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit {

  public notes: NotesModel[] = [];

  public isEdit = false;

  constructor(private dialogService: DialogService,
              private bookmarkService: BookmarksService) { }

  ngOnInit(): void {
    this.bookmarkService.updateNotesEvent.pipe().subscribe(
      (val) => {
      if (val){
        this.notes = this.bookmarkService.getItemFromLocalStorage<NotesModel>(null, this.bookmarkService.notePath);
      }
    },
      () => console.log(''),
      () => console.log());
    this.notes = this.bookmarkService.getItemFromLocalStorage<NotesModel>(null, this.bookmarkService.notePath);

  }


  public openCreator(note: NotesModel): void{
    this.dialogService.open(NotepadEditorComponent, {
      header: 'Editing note',
      width: '70%',
      data: {
        isCreate: false,
        editedNote: note
      }
    }).onClose.subscribe((item) => {
      console.log(item)
    });
  }

  public deleteNotes(item: NotesModel): void{
    this.bookmarkService.deleteNotes(item);
  }

}
