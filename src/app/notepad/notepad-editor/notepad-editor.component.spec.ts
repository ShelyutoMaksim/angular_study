import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadEditorComponent } from './notepad-editor.component';

describe('NotepadEditorComponent', () => {
  let component: NotepadEditorComponent;
  let fixture: ComponentFixture<NotepadEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotepadEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotepadEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
