import { Component, OnInit } from '@angular/core';
import { Food } from '../food.model';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-read',
  templateUrl: './food-read.component.html',
  styleUrls: ['./food-read.component.css']
})
export class FoodReadComponent implements OnInit {

  foods: Food[];
  displayedColumns = ['action','id', 'code', 'name', 'gramsPortion', 'calorie', 'protein', 'carbo', 'lipid'];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.read().subscribe(foods => {
      this.foods = foods;
    })
  }

  getFoodsTotal(): number {
    return this.foods.length;
  }

}
