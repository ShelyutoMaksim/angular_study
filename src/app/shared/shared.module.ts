import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from "./card/card.component";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {ImageModule} from "primeng/image";
import {ChipModule} from "primeng/chip";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TooltipModule} from "primeng/tooltip";
import {AppModule} from "../app.module";
import {ViewCardsComponent} from "./view-cards/view-cards.component";
import {PanelModule} from "primeng/panel";
import {ScrollPanelModule} from "primeng/scrollpanel";



@NgModule({
  declarations: [
    CardComponent,
    ViewCardsComponent
  ],
  exports: [
    CardComponent,
    ViewCardsComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ImageModule,
    ChipModule,
    DialogModule,
    ConfirmDialogModule,
    TooltipModule,
    PanelModule,
    ScrollPanelModule,
  ]
})
export class SharedModule { }
