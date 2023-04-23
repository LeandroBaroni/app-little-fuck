import { Injectable } from '@angular/core';
import { ModalActionsComponent } from '@components/modals/modal-actions/modal-actions.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(private modalController: ModalController) {}

  async open(isDisable: boolean) {
    const modalRef = await this.modalController.create({
      component: ModalActionsComponent,
      componentProps: {
        isDisable
      }
    });

    await modalRef.present();
  }
}
