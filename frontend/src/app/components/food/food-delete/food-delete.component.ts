import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../food.model';
import { FoodService } from '../food.service';

@Component({
  selector: 'app-food-delete',
  templateUrl: './food-delete.component.html',
  styleUrls: ['./food-delete.component.css']
})
export class FoodDeleteComponent implements OnInit {

  food: Food

  constructor(private foodService: FoodService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.foodService.readById(id).subscribe(food => {
      this.food = food;
    });
  }

  deleteFood(): void {
    if (this.food.name === null || this.food.code === null || this.food.protein === null || this.food.lipid === null || this.food.carbo === null || this.food.calorie === null) {
      this.foodService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.foodService.delete(String(this.food.id)).subscribe(() => {
        this.foodService.showMessage('Alimento deletado com sucesso!', 'green-snackbar');
        this.cancel();
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/foods'])
  }

}
