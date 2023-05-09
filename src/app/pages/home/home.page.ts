import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@burand/angular';
import { Participant } from '@models/round.interface';
import { Round } from '@models/round.interface';
import { ModalSetNameService } from '@services/modals/modal-set-name.service';
import { ModalWinnerService } from '@services/modals/modal-winner.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit , OnDestroy{
  round: Round;

  constructor(
    private setNameService: ModalSetNameService,
    private winnerService: ModalWinnerService
  ){}

  ngOnInit() {
    const value = LocalStorage.getItem('round') as string;
    if(value) {
      this.round = JSON.parse(value);
      console.log(this.round);
    }


    this.round = {
      id: null,
      active: true,
      createdAt: new Date(),
      updatedAt: null,
      participants: [
        {
          name: 'Leandro',
          points: 5
        },
        {
          name: 'Rafael',
          points: 5
        },
        {
          name: 'Rocky',
          points: 5
        }
      ],
      quantityRound: 0
    }
    console.log(this.round);
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

  async refreshRound() {
    this.round.quantityRound++;
    if (this.round.participants.find(p => p.points === 0)) {
      this.round.participants = this.round.participants.filter(p => p.points !== 0);
    }
    if(this.round.participants.length === 1){
      const participant = this.round.participants.at(0);
      await this.winnerService.open(participant)
    }
    console.log(this.round);
  }

  removePoints(participant: Participant) {
    if(participant.points > 0) {
      participant.points--;
    }
  }

  addPoints(participant: Participant) {
    console.log(participant);
    if(participant.points < 5) {
      participant.points++;
    }
  }
}
