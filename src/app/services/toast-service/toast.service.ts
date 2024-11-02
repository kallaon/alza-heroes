import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastType } from '../../models/toas.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  private nextId = 1;
  toasts$ = this.toastsSubject.asObservable();

  /**
   * Displays a toast notification with the specified message and type.
   * The toast will automatically be dismissed after 5 seconds.
   *
   * @param message - The message to display in the toast.
   * @param type - The type of the toast (e.g., Info, Success, Error). Defaults to ToastType.Info.
   */
  showToast(message: string, type: ToastType = ToastType.Info) {
    const toast: Toast = { message, type, id: this.nextId++ };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);

    // Automatically dismiss the toast after 5 seconds
    setTimeout(() => this.dismissToast(toast.id), 5000);
  }

  /**
   * Dismisses a toast notification by its ID.
   * 
   * @param id - The unique identifier of the toast to be dismissed.
   */
  dismissToast(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter(toast => toast.id !== id));
  }
}
