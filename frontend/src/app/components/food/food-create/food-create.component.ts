import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food.service';
import { Router } from '@angular/router';
import { Food } from '../food.model';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.css']
})
export class FoodCreateComponent implements OnInit {

  food: Food = {
    name: null,
    code: null,
    protein: null,
    lipid: null,
    carbo: null,
    calorie: null,
    gramsPortion: 100
  }

  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit(): void {
  }
  
  createFood(): void {
    if (this.food.name === null || this.food.code === null || this.food.protein === null || this.food.lipid === null || this.food.carbo === null || this.food.calorie === null) {
      this.foodService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
      // console.log(this.food.name,this.food.code,this.food.protein,this.food.lipid,this.food.carbo,this.food.calorie)
    } else {
      this.foodService.create(this.food).subscribe(() => {
        this.foodService.showMessage('Alimento criado com sucesso!', 'green-snackbar');
        this.router.navigate(['/foods']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/foods']);
  }

}
