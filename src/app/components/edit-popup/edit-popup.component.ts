import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [CommonModule, DialogModule,FormsModule, RatingModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) { }

  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<any> = new EventEmitter<Product>();
  @Input() header!: string; // ! means will always be provided

  @Input() product: Product={
    name: '',
    price: '',
    image: '',
    rating: 0
  }

  ngOnChanges(): void {
    this.productForm.patchValue(this.product);
  }

  spcialCharValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(control.value);
      return hasSpecialChar ? null : { hasSpecialChar: true };
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.spcialCharValidator()]],
    price: [''],
    image: ['', [Validators.required]],
    rating: [0]
  });

  onConfirm(){
    const { name, price, image, rating } = this.productForm.value;
    this.confirm.emit({
      name: name || '',
      price: price || '',
      image: image || '',
      rating: rating || 0
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
