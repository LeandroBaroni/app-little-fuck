import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from '../pages/feed/feed.component';
import { SuperTabComponent } from '../pages/super-tab/super-tab.component';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'super-tab',
    pathMatch: 'full'
  },

  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'super-tab',
        component: SuperTabComponent,
        loadChildren: () => import('../pages/super-tab/super-tab.module').then(m => m.SuperTabModule)
      },
      {
        path: 'feed',
        component: FeedComponent,
        loadChildren: () => import('../pages/feed/feed.module').then(m => m.FeedModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
