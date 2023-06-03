import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@burand/angular';
import { Participant, Round } from '@models/round.interface';
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
    } else {
      const auxParticipants = JSON.parse(LocalStorage.getItem('participants'));
      const participants: Participant[]= [];

      if(auxParticipants) {
        auxParticipants.forEach(participant => {
          participants.push({ name: participant.name, points: 5 });
        });
      }
      this.round = {
        id: null,
        active: true,
        createdAt: new Date(),
        updatedAt: null,
        participants: participants.length
          ? participants
          : [
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
      };

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

        LocalStorage.setItem('participants', JSON.stringify(this.round.participants));
      }
    }
  }

  async refreshRound() {
    if (this.round.participants.find(p => p.points === 0)) {
      this.round.quantityRound++;
      this.round.participants = this.round.participants.filter(p => p.points !== 0);
      LocalStorage.setItem('round', JSON.stringify(this.round));
    }
    if(this.round.participants.length === 1){
      const participant = this.round.participants.at(0);
      await this.winnerService.open(participant)
    }
  }

  removePoints(participant: Participant) {
    if(this.round.participants.length > 1 && participant.points > 0) {
      participant.points--;
    }
  }

  addPoints(participant: Participant) {
    if(this.round.participants.length > 1 && participant.points < 5) {
      participant.points++;
    }
  }
}
