import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Participant } from '@models/round.interface';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal-winner',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-winner.component.html',
  styleUrls: ['./modal-winner.component.scss']
})
export class ModalWinnerComponent {
  participant: Participant;
}
