import { Injectable } from '@angular/core';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Database, set, ref, remove, onDisconnect, serverTimestamp, OnDisconnect } from '@angular/fire/database';
import { BehaviorSubject, filter, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionContext {
  private loggedIn: BehaviorSubject<User>;
  private onDisconnectOnlineRef: OnDisconnect;
  private onDisconnectLastOnlineRef: OnDisconnect;

  constructor(private auth: Auth, private database: Database) {
    this.loggedIn = new BehaviorSubject(undefined);

    authState(this.auth).subscribe(async user => {
      this.setLoggedUser(user);

      if (user) {
        await remove(ref(this.database, `${user.uid}/lastOnline`));
        await set(ref(this.database, `${user.uid}/online`), 1);

        this.onDisconnectOnlineRef = onDisconnect(ref(this.database, `${user.uid}/online`));
        this.onDisconnectOnlineRef.set(0);

        this.onDisconnectLastOnlineRef = onDisconnect(ref(this.database, `${user.uid}/lastOnline`));
        this.onDisconnectLastOnlineRef.set(serverTimestamp());
      }
    });
  }

  async getBearerToken(): Promise<string> {
    const currentUser = await this.getCurrentUser();
    return currentUser.getIdToken();
  }

  state(): Observable<User> {
    return authState(this.auth);
  }

  getCurrentUser(): Promise<User> {
    return firstValueFrom(this.state());
  }

  get loggedUser(): Observable<User> {
    return this.loggedIn.pipe(filter(loggedIn => loggedIn !== undefined));
  }

  getLoggedUser(): User {
    return this.loggedIn.value;
  }

  private setLoggedUser(user: User): void {
    this.loggedIn.next(user);
  }

  getLoggedUserId(): string {
    return this.loggedIn.value.uid;
  }

  async logout(): Promise<void> {
    const userId = this.getLoggedUserId();

    await this.onDisconnectOnlineRef.cancel();
    await this.onDisconnectLastOnlineRef.cancel();

    await set(ref(this.database, `${userId}/online`), 0);
    await set(ref(this.database, `${userId}/lastOnline`), serverTimestamp());

    await signOut(this.auth);
  }
}
