import { FirebaseAbstract } from "@burand/angular";
import { Round } from "../models/round.interface";
import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { FirestoreCollecionName } from "../config/firestore-collection-name";

@Injectable({
  providedIn: 'root'
})
export class RoundRepository extends FirebaseAbstract<Round> {
  constructor(protected override firestore: Firestore) {
    super(firestore, FirestoreCollecionName.ROUNDS);
  }
}
