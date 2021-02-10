import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class LoaderService {
  private visible$ = new BehaviorSubject<boolean>(false);

  show() {
    this.visible$.next(true);
  }

  hide() {
    this.visible$.next(false);
  }

  isVisible(): Observable<boolean> {
    return this.visible$.asObservable().pipe(share());
  }
}
