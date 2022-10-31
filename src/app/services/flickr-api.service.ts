import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";

export interface SearchData {
  photos: SearchPhotos;
  stat: string;
}

export interface SearchPhotos {
  page: number;
  pages: number;
  perpage: number;
  photo: SearchPhoto[];
  total: number;
}

export interface SearchPhoto {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlickrApiService {
  public perPage = 12;
  private baseUrl = 'https://www.flickr.com/services/rest/';
  private methodsApi = {
    search: 'flickr.photos.search',
    getImageInfo: 'flickr.photos.getInfo',
    getImageComments: 'flickr.photos.comments.getList'
  }

  constructor(private http: HttpClient) {
  }

  public searchImage(input: string, pageNumber: number): Observable<SearchData> {
    return this.http.get(`${this.baseUrl}?method=${this.methodsApi.search}&api_key=${environment.flickrApiKey}&text=${input}&format=json&nojsoncallback=1&per_page=${this.perPage}&page=${pageNumber}`) as Observable<SearchData>;
  }

  public getImageInfo(photoId: string, secret: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?method=${this.methodsApi.getImageInfo}&api_key=${environment.flickrApiKey}&photo_id=${photoId}&secret=${secret}&format=json&nojsoncallback=1`);
  }

  public getImageComments(photoId: string | undefined): Observable<any> {
    if (photoId){
      return this.http.get(`${this.baseUrl}?method=${this.methodsApi.getImageComments}&api_key=${environment.flickrApiKey}&photo_id=${photoId}&format=json&nojsoncallback=1`);
    }
    return of(null);
  }
}
