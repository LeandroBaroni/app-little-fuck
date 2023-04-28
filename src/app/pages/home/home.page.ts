import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@burand/angular';
import { Round } from '@models/round.interface';
import { ModalSetNameService } from '@services/modals/modal-set-name.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit , OnDestroy{
  round: Round;

  constructor(
    private setNameService: ModalSetNameService
  ){}

  ngOnInit() {
    const value = LocalStorage.getItem('round') as string;
    if(value) {
      this.round = JSON.parse(value);
      console.log(this.round);
    }
  }

  ngOnDestroy() {
    LocalStorage.setItem('round', JSON.stringify(this.round));
  }

  async setParticipant(event: boolean) {
    if(event) {
      const res = await this.setNameService.open();
      if(res) {
        const participant = {
          name: String(res),
          points: 5
        };
        if(!this.round){
          this.round = {
            id: null,
            active: true,
            createdAt: new Date(),
            updatedAt: null,
            participants: [participant],
            quantityRound: 0
          }
        } else {
          this.round.participants.push(participant);
        }
      }
    }
  }

  refreshRound() {
    this.round.quantityRound++;
  }
}
