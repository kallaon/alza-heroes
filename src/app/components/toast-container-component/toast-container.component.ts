import { Component, OnInit } from '@angular/core';
import { Toast } from '../../models/toas.model';
import { ToastService } from '../../services/toast-service/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(id: number) {
    this.toastService.dismissToast(id);
  }
}
