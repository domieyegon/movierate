import { Component, OnInit } from '@angular/core'
import { Router, RouterEvent } from '@angular/router'
import { RouterExtensions } from '@nativescript/angular'
import { ApplicationSettings } from '@nativescript/core'

import { Item } from './item'
import { ItemService } from './item.service'

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: Array<Item>

  constructor(
    private itemService: ItemService,
    private router:RouterExtensions
    ) {}

  userLogout() {
    ApplicationSettings.remove('mr-token');
    this.router.navigate(['/login'], {clearHistory: true});
  }

  ngOnInit(): void {
    this.items = this.itemService.getItems()
  }
}
