import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-read',
  templateUrl: './inventory-read.component.html',
  styleUrls: ['./inventory-read.component.css']
})
export class InventoryReadComponent implements OnInit {

  inventory: Inventory[];
  displayedColumns = ['action','id', 'foodCode', 'amount'];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.read().subscribe(inventory => {
      this.inventory = inventory;
    })
  }
}
