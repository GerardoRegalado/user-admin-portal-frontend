import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface BaseEntity {
_id?: string;
name: string;
[key: string]: any;
}


@Component({
selector: 'app-entity-card',
templateUrl: './card.component.html',
styleUrls: ['./card.component.scss'],
standalone: true,
imports: [FormsModule, CommonModule]
})
export class EntityCardComponent<T extends BaseEntity> {
@Input() type: 'user' | 'category' | 'product' = 'user';
@Output() onDelete = new EventEmitter<T>();
@Output() onUpdate = new EventEmitter<T>();
@Output() onViewDetails = new EventEmitter<string>();


editing = false;
model!: T;

@Input()
set entity(value: T) {
  if (value) {
    this._entity = value;
    this.model = { ...value };
  }
}
get entity(): T {
  return this._entity;
}
private _entity!: T;


toggleEdit() {
this.editing = !this.editing;
if (!this.editing) this.model = { ...this.entity };
}


save() {
this.onUpdate.emit(this.model);
this.editing = false;
}


remove() {
this.onDelete.emit(this.entity);
}
}
