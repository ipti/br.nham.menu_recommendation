import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../food.model';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-update',
  templateUrl: './food-update.component.html',
  styleUrls: ['./food-update.component.css']
})
export class FoodUpdateComponent implements OnInit {

  // food: Food = {
  //   name: null,
  //   code: null,
  //   protein: null,
  //   lipid: null,
  //   carbo: null,
  //   calorie: null
  // }

  food: Food

  constructor(private foodService: FoodService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.foodService.readById(id).subscribe(food => {
      this.food = food;
    });
  }

  updateFood(): void {
    if (this.food.name === null || this.food.code === null || this.food.protein === null || this.food.lipid === null || this.food.carbo === null || this.food.calorie === null) {
      this.foodService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.foodService.update(this.food).subscribe(() => {
        this.foodService.showMessage('Alimento atualizado com sucesso!', 'green-snackbar');
        this.cancel();
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/foods'])
  }
}
