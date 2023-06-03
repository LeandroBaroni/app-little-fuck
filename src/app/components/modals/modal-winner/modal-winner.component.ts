import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Participant } from '@models/round.interface';

@Component({
  selector: 'app-modal-winner',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-winner.component.html',
  styleUrls: ['./modal-winner.component.scss']
})
export class ModalWinnerComponent {
  participant: Participant;

  constructor(private modalController: ModalController) {}

  async dismiss() {
    await this.modalController.dismiss();
  }
}
