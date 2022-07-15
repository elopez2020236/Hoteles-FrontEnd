import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUsuario'
})
export class SearchUsuarioPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
