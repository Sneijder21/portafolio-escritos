import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../interfaces/item.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  cargando = true;
  item: Item;
  id: string;
  constructor( private route: ActivatedRoute, public itemService: ItemService) { }

  ngOnInit() {
    this.route.params.
      subscribe( param => {
        this.itemService.cargarItem(param.id)
          .subscribe( (resp: Item ) => {
            this.item = resp;
            this.id = param.id;
            this.cargando = false;
          });
      });
  }

}
