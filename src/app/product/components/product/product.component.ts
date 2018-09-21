import {
  Component,
  OnInit,
  Input,
  Output,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input()
  product: Product;
  @Output()
  add = new EventEmitter<Product>();
  @Output()
  subtract = new EventEmitter<Product>();

  constructor() {}

  ngOnInit() {}

  addToCart() {
    this.add.emit(this.product);
  }

  removeFromCart() {
    this.subtract.emit(this.product);
  }
}