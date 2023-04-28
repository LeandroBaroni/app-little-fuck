import { Injectable } from "@angular/core";
import { ModalSetNameComponent } from "@components/modals/modal-set-name/modal-set-name.component";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ModalSetNameService {
  constructor(private modalController: ModalController){}

  async open() {
    const modalRef = await this.modalController.create({
      component: ModalSetNameComponent,
      cssClass: 'modal-select',
      initialBreakpoint: 0.3,
      breakpoints: [0, 0.3]
    });

    await modalRef.present();
    return (await modalRef.onDidDismiss()).data;
  }
}
