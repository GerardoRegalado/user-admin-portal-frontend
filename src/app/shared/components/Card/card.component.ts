import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
selector: 'app-user-card',
templateUrl: './card.component.html',
styleUrls: ['./card.component.scss'],
standalone: true,
imports: [FormsModule, CommonModule]
})
export class UserCardComponent {
@Input() user!: User;
@Output() onDelete = new EventEmitter<User>();
@Output() onUpdate = new EventEmitter<User>();
@Output() onViewDetails = new EventEmitter<string>();



editing = false;
model!: User;


ngOnInit() {
this.model = { ...this.user };
}


toggleEdit() {
this.editing = !this.editing;
if (!this.editing) this.model = { ...this.user }; // reset on cancel
}


save() {
this.onUpdate.emit(this.model);
this.editing = false;
}

remove() {
  this.onDelete.emit(this.user);
}

}
