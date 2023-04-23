import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule, TabsRoutingModule, TabsRoutingModule, IonicModule],
  exports: [TabsComponent]
})
export class TabsModule {}
