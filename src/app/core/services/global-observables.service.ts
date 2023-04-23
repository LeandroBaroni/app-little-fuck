import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class GlobalObservableService {
  // Observable string sources
  private post = new Subject<any>();

  // Observable string streams
  post$ = this.post.asObservable();

  // Service message commands
  setPost(data: any) {
    this.post.next(data);
  }
}
