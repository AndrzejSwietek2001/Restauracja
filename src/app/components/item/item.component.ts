import {Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../store/models/product.model";
import {Store} from "@ngxs/store";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import {ProductState} from "../../store/state/product.state";
// FOR ADDING/Removing
import {AddProduct, EditProduct, RemoveProduct} from "../../store/actions/product.action";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {CategoryType, CuisineType} from "../../shared/types";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: ProductModel;
  constructor(private store: Store) { }

  faTrash = faTrash;



  ngOnInit(): void {
  }
  plus(){
    if(this.item.quantity!=0){
      this.store.dispatch(new EditProduct({
        ...this.item,
        quantity: this.item.quantity - 1
      }))

      // console.log(this.ordered);
    }

  }
  minus(){
    // if(this.ordered>0)
    this.store.dispatch(new EditProduct({
      ...this.item,
      quantity: this.item.quantity + 1
    }))
  }

  deleteHandle() {
    this.store.dispatch(new RemoveProduct(this.item));
  }

}
