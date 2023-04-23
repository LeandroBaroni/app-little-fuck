import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FirebaseAbstract } from '@burand/angular';
import { User } from '@models/user.interface';

import { FirestoreCollecionName } from '../config/firestore-collection-name';

@Injectable({
  providedIn: 'root'
})
export class UserRepository extends FirebaseAbstract<User> {
  constructor(protected override firestore: Firestore) {
    super(firestore, FirestoreCollecionName.USERS);
  }
}
