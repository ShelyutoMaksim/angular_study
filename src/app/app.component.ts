import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "primeng/api";
import {HttpClient} from "@angular/common/http";

export enum LayoutType {
  FINDER = 1,
  BOOKMARKS,
  UNIQUE_BOOKMARKS
}

export enum BookmarksType {
  STANDARD_BOOKMARKS = 1,
  UNIQUE_BOOKMARKS
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  public title = 'image-finder';
  public items: MenuItem[] = [
    {
      icon: 'pi pi-bars', styleClass: 'header__menu-bar--icon', command: (event) => {
        this.displaySideBar = !this.displaySideBar;
      }
    }
  ];
  public readonly bookmarksType = BookmarksType;
  public readonly layoutType = LayoutType;
  public layoutVariant: LayoutType = LayoutType.FINDER;



  public displaySideBar: boolean = false;

  public displayLoginDialog = false;
  public displayLogoutDialog = false;
  public isLogined = false;
  constructor(private http: HttpClient) {
  }

  public hideSideBar(): void {
    this.displaySideBar = !this.displaySideBar;
  }

  public openDialogLogin(): void {
    if (!this.isLogined) {
      this.displayLoginDialog = !this.displayLoginDialog;
    }

  }
  public openDialogLogout(): void {
    if (this.isLogined) {
      this.displayLogoutDialog = !this.displayLogoutDialog;
    }
  }

  public loginAction(): void {
    this.openDialogLogin()
    this.isLogined = !this.isLogined;

  }

  public logoutAction(): void {
    this.openDialogLogout()
    this.isLogined = !this.isLogined;

  }

  ngOnInit() {

  }

}
