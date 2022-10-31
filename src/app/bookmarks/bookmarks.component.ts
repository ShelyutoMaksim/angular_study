import {Component, Input, OnInit} from '@angular/core';
import {ImageData} from "../finder/finder.component";
import {BookmarksService} from "../services/bookmarks.service";
import {BookmarksType} from "../app.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  @Input() public bookmarksType: BookmarksType = BookmarksType.STANDARD_BOOKMARKS;

  public get mockData(): ImageData[] {
    return this._mockData;
  }

  public get dataIsEmpty(): boolean {
    return this.mockData.length > 0
  }

  public get noDataPlaceholder(): string {
    return this.bookmarksType === BookmarksType.STANDARD_BOOKMARKS ? 'No bookmarks' : 'No unique bookmarks';
  }

  private _mockData: ImageData[] = [];

  constructor(private bookmarksService: BookmarksService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.bookmarksType = data['bookmarksType'];
      this.bookmarksService.bookmarksType = this.bookmarksType;
      this.bookmarksService.deleteBookmarkEvent.subscribe((val) => {
        if (val){
          this.bookmarksService.bookmarksType = this.bookmarksType;
          this._mockData = this.bookmarksService.getItemFromLocalStorage(this.bookmarksType);
        }
      });
      this._mockData = this.bookmarksService.getItemFromLocalStorage(this.bookmarksType);
    });
  }

}
