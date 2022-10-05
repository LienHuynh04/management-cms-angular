import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoadingOverlayService {
  public isLoading$: Observable<boolean>;
  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  set isLoading(value: boolean) {
    this.isLoadingSubject.next(value);
  }

  get isLoading(): boolean {
    return  this.isLoadingSubject.value;
  }
}
