import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ImageData, ImageDataComments} from "../../finder/finder.component";
import {FlickrApiService} from "../../services/flickr-api.service";
import {map} from "rxjs";

@Component({
  selector: 'app-view-cards',
  templateUrl: './view-cards.component.html',
  styleUrls: ['./view-cards.component.scss']
})
export class ViewCardsComponent implements OnInit {
  public cardData: ImageData | undefined;

  public get commentsIsEmpty(): boolean{
    return this.cardData?.comments.length === 0;
  }

  constructor(
    private flickrApiService: FlickrApiService,
    protected dynamicDialogConfig: DynamicDialogConfig,
  ) {
  }

  ngOnInit(): void {
    this.cardData = this.dynamicDialogConfig.data.cardData;
    // spinner = true
    this.flickrApiService.getImageComments(this.cardData?.photoId)
      .pipe(map((responseData) => {
        return responseData.comments.comment as ImageDataComments[]
      }))
      .subscribe((photoComments) => {
        console.log(photoComments)
        if (typeof this.cardData !== 'undefined') {
          this.cardData.comments = photoComments;
          // spinner = false
          console.log('this.cardData', this.cardData)
        }
      })
  }


}






