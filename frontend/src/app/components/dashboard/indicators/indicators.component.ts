import { Component, OnInit } from '@angular/core';
// import { FoodReadComponent } from '../../food/food-read/food-read.component';
import { FoodService } from '../../food/food.service';
import { GroupingService } from '../../grouping/grouping.service';
import { InventoryService } from '../../inventory/inventory.service';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-indicators',
  templateUrl: './indicators.component.html',
  styleUrls: ['./indicators.component.css']
})
export class IndicatorsComponent implements OnInit {

  foodTotal: number
  groupingTotal: number
  inventoryTotal: number
  menuTotal: number

  constructor(
    private foodService: FoodService,
    private groupingService: GroupingService,
    private menuService: MenuService,
    private inventoryService: InventoryService
  ) { }
  // constructor() { }

  ngOnInit(): void {
    this.foodService.read().subscribe(foods => {
      this.foodTotal = foods.length;
    })
    this.groupingService.read().subscribe(group => {
      this.groupingTotal = group.length;
    })
    this.inventoryService.read().subscribe(inventory => {
      this.inventoryTotal = inventory.length;
    })
    this.menuService.read().subscribe(menu => {
      this.menuTotal = menu.length;
    })
  }

}
