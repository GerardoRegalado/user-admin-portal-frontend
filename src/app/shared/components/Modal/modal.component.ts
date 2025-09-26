import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() title = '';
  @Input() visible = false;
  @Input() mode: 'create' | 'edit' | 'confirm' | 'view' = 'create';
  @Input() model: User = { name: '', username: '', email: '', password: '' };
  @Input() danger = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<User | true>();

  confirm() {
    if (this.mode === 'confirm') this.onConfirm.emit(true);
    else this.onConfirm.emit(this.model);
  }
}
