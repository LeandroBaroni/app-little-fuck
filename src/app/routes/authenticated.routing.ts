import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { OpenMessagesComponent } from 'src/app/pages/open-messages/open-messages.component';

// import { FollowersListComponent } from '../pages/followers-list/followers-list.component';
// import { FriendProfileComponent } from '../pages/friend-profile/friend-profile.component';
// import { GalleryComponent } from '../pages/gallery/gallery.component';
// import { HomeTurnItComponent } from '../pages/home-turn-it/home-turn-it.component';
// import { LocalizationComponent } from '../pages/localization/localization.component';
// import { MessagesListComponent } from '../pages/messages-list/messages-list.component';
// import { PaymentsAndPlansComponent } from '../pages/payments-and-plans/payments-and-plans.component';
// import { ProfileAndNavigationComponent } from '../pages/profile-and-navigation/profile-and-navigation.component';
// import { ProfileTurnItComponent } from '../pages/profile-turn-it/profile-turn-it.component';
// import { EditProfileComponent } from '../pages/profile/edit-profile/edit-profile.component';
// import { MyProfileComponent } from '../pages/profile/my-profile/my-profile.component';
// import { SearchComponent } from '../pages/search/search.component';
// import { ShowMediaComponent } from '../pages/show-media/show-media.component';
// import { FriendsFollowersListComponent } from '../pages/friends-followers-list/friends-followers-list.component';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('../tabs/tabs.module').then(m => m.TabsModule)
  },
  // {
  //   path: 'friend-profile/:id',
  //   component: FriendProfileComponent,
  //   loadChildren: () => import('../pages/friend-profile/friend-profile.module').then(m => m.FriendProfileModule)
  // },
  // {
  //   path: 'followers-list',
  //   component: FollowersListComponent,
  //   loadChildren: () => import('../pages/followers-list/followers-list.module').then(m => m.FollowersListModule)
  // },
  // {
  //   path: 'friend-followers-list/:userId',
  //   component: FriendsFollowersListComponent,
  //   loadChildren: () => import('../pages/friends-followers-list/friends-followers-list.module').then(m => m.FriendsFollowersListModule)
  // },
  // {
  //   path: 'profile-and-navigation',
  //   component: ProfileAndNavigationComponent,
  //   loadChildren: () =>
  //     import('../pages/profile-and-navigation/profile-and-navigation.module').then(m => m.ProfileAndNavigationModule)
  // },
  // {
  //   path: 'open-messages/:chatId',
  //   component: OpenMessagesComponent,
  //   loadChildren: () => import('../pages/open-messages/open-messages.module').then(m => m.OpenMessagesModule)
  // },
  // {
  //   path: 'profile',
  //   component: MyProfileComponent,
  //   loadChildren: () => import('../pages/profile/my-profile/my-profile.module').then(m => m.MyProfileModule)
  // },
  // {
  //   path: 'profile/edit',
  //   component: EditProfileComponent,
  //   loadChildren: () => import('../pages/profile/edit-profile/edit-profile.module').then(m => m.EditProfileModule)
  // },
  // {
  //   path: 'payments-and-plans',
  //   component: PaymentsAndPlansComponent,
  //   loadChildren: () =>
  //     import('../pages/payments-and-plans/payments-and-plans.module').then(m => m.PaymentsAndPlansModule)
  // },
  // {
  //   path: 'gallery/:id',
  //   component: GalleryComponent,
  //   loadChildren: () => import('../pages/gallery/gallery.module').then(m => m.GalleryModule)
  // },
  // {
  //   path: 'messages-list',
  //   component: MessagesListComponent,
  //   loadChildren: () => import('../pages/messages-list/messages-list.module').then(m => m.MessagesListModule)
  // },
  // {
  //   path: 'home-turn-it',
  //   component: HomeTurnItComponent,
  //   loadChildren: () => import('../pages/home-turn-it/home-turn-it.module').then(m => m.HomeTurnItModule)
  // },
  // {
  //   path: 'profile-turn-it',
  //   component: ProfileTurnItComponent,
  //   loadChildren: () => import('../pages/profile-turn-it/profile-turn-it.module').then(m => m.ProfileTurnItModule)
  // },
  // {
  //   path: 'search',
  //   component: SearchComponent,
  //   loadChildren: () => import('../pages/search/search.module').then(m => m.SearchModule)
  // },
  // {
  //   path: 'localization',
  //   component: LocalizationComponent,
  //   loadChildren: () => import('../pages/localization/localization.module').then(m => m.LocalizationModule)
  // },
  // {
  //   path: 'show-media/:id',
  //   component: ShowMediaComponent,
  //   loadChildren: () => import('../pages/show-media/show-media.module').then(m => m.ShowMediaModule)
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthenticatedRoutingModule { }
