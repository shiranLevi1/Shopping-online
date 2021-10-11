import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { StateService } from '../services/state.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: IProduct[], name: string): any {

    if(name != null){
      return products.filter(product => (product.name.toLowerCase().startsWith(name.toLowerCase())))
    }

    return products; 
  }
}
