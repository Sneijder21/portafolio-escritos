import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto [] = [];

  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise( (resolve, reject) => {
      this.http.get('https://neyser-portafolio.firebaseio.com/productos_idx.json')
        .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          setTimeout(() => {
            this.cargando = false;
          }, 40);
          resolve();
      });
    });

  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        console.log('estaba vacia');
        this.filtrarProductos(termino);
      });
    } else {
      console.log('no estaba vacia');
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string ) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    console.log('que hay');
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productosFiltrado.push(prod);
      }
    });
    console.log('como vamos');
    console.log(this.productosFiltrado);
  }

}
