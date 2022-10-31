import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ImageData} from "../../finder/finder.component";
import {BookmarksService} from "../../services/bookmarks.service";
import {BookmarksType} from "../../app.component";
import {ConfirmationService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ViewCardsComponent} from "../view-cards/view-cards.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ConfirmationService]
})
export class CardComponent implements OnInit {
  public inBookmarks = false;
  public inUniqBookmarks = false;
  @Input() public card: ImageData | undefined;

  public get cardNotEmpty(): boolean {
    return typeof this.card !== 'undefined' &&
      typeof this.card?.imageName !== 'undefined' &&
      typeof this.card?.imageLink !== 'undefined' &&
      typeof this.card?.author !== 'undefined' &&
      typeof this.card?.tags !== 'undefined';
  }

  public get getAuthor(): string {
    return this.card ? this.card.author : '';
  }

  public readonly bookmarksType = BookmarksType;


  constructor(
    private bookmarksService: BookmarksService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService
  ) {
  }

  public ngOnInit(): void {
    if (this.cardNotEmpty) {
      this.bookmarksService.bookmarksType = BookmarksType.STANDARD_BOOKMARKS;
      this.inBookmarks = this.bookmarksService.searchInBookmarks(this.card as ImageData);
      this.bookmarksService.bookmarksType = BookmarksType.UNIQUE_BOOKMARKS;
      this.inUniqBookmarks = this.bookmarksService.searchInBookmarks(this.card as ImageData);
    }
  }

  public addBookmark(bookmarksType: BookmarksType): void {
    this.bookmarksService.bookmarksType = bookmarksType;
    if (bookmarksType === BookmarksType.STANDARD_BOOKMARKS) {
      this.inBookmarks = this.bookmarksService.addToBookmarks(this.card as ImageData);
    } else {
      this.inUniqBookmarks = this.bookmarksService.addToBookmarks(this.card as ImageData);
    }
  }

  public deleteBookmark(bookmarksType: BookmarksType): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.bookmarksService.bookmarksType = bookmarksType;
        if (bookmarksType === BookmarksType.STANDARD_BOOKMARKS) {
          this.inBookmarks = this.bookmarksService.deleteBookmarks(this.card as ImageData);
        } else {
          this.inUniqBookmarks = this.bookmarksService.deleteBookmarks(this.card as ImageData);
        }
      }
    });

  }

  showDialog() {
    this.dialogService.open(ViewCardsComponent, {
      header: 'Full card',
      width: '100%',
      height: '100%',
      data: {
        cardData: this.card
        // isCreate: false,
        // editedNote: note
      }
    }).onClose.subscribe((item) => {
      console.log(item)
    });
  }


}
