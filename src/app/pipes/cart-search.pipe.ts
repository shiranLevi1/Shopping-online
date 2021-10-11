import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Pipe({
  name: 'cartSearch'
})
export class CartSearchPipe implements PipeTransform {

  transform(cart: IProduct[], name: string): any {

    if(name != null){
      return cart.filter(cartProduct => (cartProduct.productName.toLowerCase().startsWith(name.toLowerCase())))
    }

    return cart; 
  }

}
