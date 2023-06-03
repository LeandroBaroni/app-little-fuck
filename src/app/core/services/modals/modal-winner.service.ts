import { Injectable } from '@angular/core';
import { ModalWinnerComponent } from '@components/modals/modal-winner/modal-winner.component';
import { ModalController } from '@ionic/angular';
import { Participant } from '@models/round.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalWinnerService {
  constructor(private modalController: ModalController){}

  async open(participant: Participant) {
    const modalRef = await this.modalController.create({
      component: ModalWinnerComponent,
      componentProps: {
        participant
      },
      cssClass: 'modal-winner',
      backdropDismiss: true,
      animated: true
    });

    await modalRef.present();
    return (await modalRef.onDidDismiss()).data;
  }
}
