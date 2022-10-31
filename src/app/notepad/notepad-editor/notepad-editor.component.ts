import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {BookmarksService} from "../../services/bookmarks.service";

@Component({
  selector: 'app-notepad-editor',
  templateUrl: './notepad-editor.component.html',
  styleUrls: ['./notepad-editor.component.scss']
})
export class NotepadEditorComponent implements OnInit {

  public isCreate: boolean = true;
  public editorForm: FormGroup | undefined;

  constructor(
    protected dialogRef: DynamicDialogRef,
    protected dynamicDialogConfig: DynamicDialogConfig,
    private noteService: BookmarksService
  ) {
  }

  ngOnInit(): void {
    this.editorForm = new FormGroup<any>({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', []),
      createDate: new FormControl(new Date(), []),
    });
    if (this.dynamicDialogConfig.data) {
      this.isCreate = this.dynamicDialogConfig.data.isCreate;
      this.editorForm.patchValue(this.dynamicDialogConfig.data.editedNote)
    }
  }

  public saveNote(): void {
    this.editorForm?.markAllAsTouched();
    if (!this.editorForm?.invalid) {
      this.noteService.addToNotes(this.editorForm?.getRawValue(), this.isCreate);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close('sosi pisos')
  }

}
