import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface Card {
  name: string;
  image: string;
}

@Component({
  selector: 'app-playing-cards',
  templateUrl: './playing-cards.component.html',
  styleUrls: ['./playing-cards.component.scss']
})
export class PlayingCardsComponent implements OnInit {

  public deckId: string = '';

  public _cardArr: Card[] = [];

  public get cardArr(): Card[] {
    return this._cardArr;
  };


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }

  public cardsNumber: number | undefined;

  public getData() {
    this._cardArr = [];
      this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').subscribe((dataID: any) => {
        this.deckId = dataID.deck_id;
        this.http.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${this.cardsNumber}`).subscribe((data: any) => {
          for (let i = 0; i < data['cards'].length; i++) {
            let card = {
              name: '',
              image: '',
            }
            card.name = data['cards'][i]['value'] + ' ' + data['cards'][i]['suit'];
            card.image = data['cards'][i]['image'];
            this._cardArr.push(card);

          }

        })

      })

  }


}
