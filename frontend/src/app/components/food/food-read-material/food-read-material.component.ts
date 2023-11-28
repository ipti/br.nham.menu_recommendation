import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Food } from '../food.model';
import { FoodService } from '../food.service';
import { FoodReadMaterialDataSource } from './food-read-material-datasource';

@Component({
  selector: 'app-food-read-material',
  templateUrl: './food-read-material.component.html',
  styleUrls: ['./food-read-material.component.css']
})
export class FoodReadMaterialComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Food>;
  dataSource: FoodReadMaterialDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'code', 'name', 'calorie', 'protein', 'carbo', 'lipid'];
  foods: Food[] = [
    {id: 1, name: 'Teste1', code: '1', gramsPortion: 100, protein: 0, lipid: 0, carbo: 0, calorie: 0},
    {id: 2, name: 'Teste2', code: '2', gramsPortion: 100, protein: 0, lipid: 0, carbo: 0, calorie: 0},
    {id: 3, name: 'Teste3', code: '1', gramsPortion: 100, protein: 0, lipid: 0, carbo: 0, calorie: 0}
  ];

  constructor(private foodService: FoodService) {
    // this.dataSource = new FoodReadMaterialDataSource(this.foods);
    // this.getData();
  }

  public getData(): void {
    this.foodService.read().subscribe(foods => {
      this.foods = foods;
      this.dataSource = new FoodReadMaterialDataSource(this.foods);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
  }
}
