import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
  @Output() addParticipantEvent: EventEmitter<boolean> = new EventEmitter();

  addParticipant() {
    this.addParticipantEvent.emit(true)
  }
}
