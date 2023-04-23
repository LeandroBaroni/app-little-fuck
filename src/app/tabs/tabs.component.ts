import { Component, EventEmitter } from '@angular/core';
import { ModalCreatePublicationComponent } from '@components/modals/modal-create-publication/modal-create-publication.component';
import { ModalController } from '@ionic/angular';
import { GlobalObservableService } from '@services/global-observables.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  eventTabs = new EventEmitter();
  eventPost = new EventEmitter();

  constructor(private modalController: ModalController, private globalObservable: GlobalObservableService) {}

  async createPublication() {
    this.eventHiddenPost(true);
    const modal = await this.modalController.create({
      component: ModalCreatePublicationComponent,
      initialBreakpoint: 0.98,
      breakpoints: [0, 0.98]
    });
    await modal.present();
    modal.onWillDismiss().then(value => {
      if (value?.data) {
        this.globalObservable.setPost(true);
      }
      this.eventHiddenPost(false);
      this.modalController.dismiss();
    });
  }

  scrollTopFeed() {
    this.eventTabs.emit();
  }

  eventHiddenPost(open: boolean) {
    this.eventPost.emit(open);
  }
}
