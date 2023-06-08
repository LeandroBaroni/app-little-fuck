import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '@burand/angular';
import { Participant, Round } from '@models/round.interface';
import { RoundRepository } from '@repositories/round.repository';
import { ModalSetNameService } from '@services/modals/modal-set-name.service';
import { ModalWinnerService } from '@services/modals/modal-winner.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePage implements OnInit , OnDestroy{
  round: Round;

  constructor(
    private roundRepository: RoundRepository,
    private setNameService: ModalSetNameService,
    private winnerService: ModalWinnerService
  ){}

  ngOnInit() {
    const value = LocalStorage.getItem('round') as string;
    if(value) {
      this.round = JSON.parse(value);
    } else {
      this.getParticipants();
    }
  }

  ngOnDestroy() {
    LocalStorage.setItem('participants', JSON.stringify(this.round.participants));
    LocalStorage.setItem('round', JSON.stringify(this.round));
  }

  getParticipants() {
    const jsonParticipants = JSON.parse(LocalStorage.getItem('participants')) as Array<Participant>;
    const participants: Participant[]= [];

    if(jsonParticipants) {
      jsonParticipants.forEach(participant => {
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

  beginRound() {
    this.round.quantityRound = 1
  }

  removeParticipant(index: number) {
    this.round.participants.splice(index, 1);
    if(this.round.participants.length){
      LocalStorage.setItem('participants', JSON.stringify(this.round.participants));
      return;
    }

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
    this.round.quantityRound++;
    if (this.round.participants.find(p => p.points === 0)) {
      this.round.participants = this.round.participants.filter(p => p.points !== 0);
    }
    if(this.round.participants.length === 1){
      const participant = this.round.participants.at(0);
      await this.roundRepository.add(this.round);
      await this.winnerService.open(participant);
      this.getParticipants();
    }
    LocalStorage.setItem('round', JSON.stringify(this.round));
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
