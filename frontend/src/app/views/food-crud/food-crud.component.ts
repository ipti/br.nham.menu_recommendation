import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-food-crud',
  templateUrl: './food-crud.component.html',
  styleUrls: ['./food-crud.component.css']
})
export class FoodCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Alimentos',
      routeUrl: '/foods'
    }
  }

  ngOnInit(): void {
  }

  navigateToFoodCreate(): void {
    this.router.navigate(['/foods/create'])
  }

}
