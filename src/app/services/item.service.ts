import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {
  }
  public cargarItem(cod: string) {
    return this.http.get(`https://neyser-portafolio.firebaseio.com/productos/${cod}.json`);
  }
}
