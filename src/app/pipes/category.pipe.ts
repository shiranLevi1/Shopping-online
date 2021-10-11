import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(products: IProduct[], categoryId: number): any {

    if(categoryId != null){
      return products.filter(product => product.categoryId == categoryId);
    }
    
    return products;
  }

}
