import {Component, OnDestroy, OnInit} from '@angular/core';
import {FlickrApiService} from "../services/flickr-api.service";
import {map} from "rxjs";

export interface ImageData {
  photoId: string;
  imageName: string;
  imageLink?: string;
  tags: ImageDataTags[];
  author: string;
  comments: ImageDataComments[];
}

export interface ImageDataComments {


  author?: string;
  author_is_deleted?: number;
  authorname: string;
  datecreate: string;
  iconfarm?: number;
  iconserver?: string;
  id: string;
  path_alias?: string;
  permalink?: string;
  realname?: string;
  _content: string;
}

export interface ImageDataTags {
  author: string;
  authorname: string;
  id: string;
  machine_tag: boolean;
  raw: string;
  _content: string;
}

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent implements OnInit, OnDestroy {

  public searchValue: string = '';

  public totalRecords = 0;

  public get imageData(): ImageData[] {
    return this._imageData;
  }

  public get dataIsEmpty(): boolean {
    return this.imageData.length > 0
  }

  private _imageData: ImageData[] = [];

  constructor(public flickrApiService: FlickrApiService) {

  }

  public paginate(event: any) {
    this.searchCards(event.page);

  }

  public searchCards(page?: number): void {
    this._imageData = [];
    if (typeof page === 'undefined') {
      page = 1;
    }
    this.flickrApiService.searchImage(this.searchValue, page).subscribe((data) => {
      this.totalRecords = data.photos.pages;
      data.photos.photo.forEach((item) => {
        this.flickrApiService.getImageInfo(item.id, item.secret)
          .pipe(
            map((dataPhotoInfo) => {
                return {
                  imageName: dataPhotoInfo.photo.title._content,
                  imageLink: `https://live.staticflickr.com/${dataPhotoInfo.photo.server}/${dataPhotoInfo.photo.id}_${dataPhotoInfo.photo.secret}.jpg`,
                  tags: dataPhotoInfo.photo.tags.tag,
                  author: dataPhotoInfo.photo.owner.realname,
                  photoId: dataPhotoInfo.photo.id,
                  comments: []
                } as ImageData
              }
            )
          )
          .subscribe((photoInfo) => {
            this._imageData.push(photoInfo)
          })
      })
    })

  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
