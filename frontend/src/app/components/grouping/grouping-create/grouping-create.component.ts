import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Food } from '../../food/food.model';
import { FoodService } from '../../food/food.service';
import { GroupingService } from '../grouping.service';
import { Router } from '@angular/router';
import { GroupItems } from '../groupItems.model';

@Component({
  selector: 'app-grouping-create',
  templateUrl: './grouping-create.component.html',
  styleUrls: ['./grouping-create.component.css']
})
export class GroupingCreateComponent implements OnInit {

  newGrouping: any = {name: null};
  form: FormGroup;
  displayedColumns = ['delete', 'code', 'gramsPortion', 'homemadePortion']
  foods: Food[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private groupingService: GroupingService,
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      groupItems: this._formBuilder.array([])
    });

    const fgs = [{gramsPortion: null, homemadePortion: null, code: null, name: null}].map(GroupItems.asFormGroup);
    this.form.setControl('groupItems', new FormArray(fgs));

    this.foodService.read().subscribe(foods => {
      this.foods = foods;
    });
  }

  get groupItems(): FormArray {
    return this.form.get('groupItems') as FormArray;
  }

  cancel(): void {
    this.router.navigate(['/grouping'])
  }

  updateFoodGrouping(): void {

  }

  addFood(currentForm: any): void {
    currentForm.groupItems.push({})
    const fgs = currentForm.groupItems.map(GroupItems.asFormGroup);
    this.form.setControl('groupItems', new FormArray(fgs));
  }

  deleteFood(row: any, currentForm: any): void {
    row = row.value;
    let index = currentForm.groupItems.findIndex((a: any) => {
      if (a.name === row.name && a.gramsPortion === row.gramsPortion && a.homemadePortion === row.homemadePortion && a.code === row.code) {
        return true;
      } else {
        return false;
      }
    })

    if (index > -1) {
      currentForm.groupItems.splice(index, 1);
      const fgs = currentForm.groupItems.map(GroupItems.asFormGroup);
      this.form.setControl('groupItems', new FormArray(fgs));
    }
  }

  createGrouping(): void {
    
    this.completeGroupItems();

    if (this.newGrouping === null || this.newGrouping.name === null || this.form.value.groupItems.length === 0 || this.checkForm()) {
      this.groupingService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.groupingService.create(this.newGrouping).subscribe(() => {
        this.groupingService.showMessage('Agrupamento criado com sucesso!', 'green-snackbar');
        this.router.navigate(['/grouping'])
      })
    }
  }

  checkForm() {
    return this.form.value.groupItems.some((hit: { code: any; gramsPortion: any; homemadePortion: any; name: any; }) => {
      if (hit.code === null || hit.gramsPortion === null || hit.homemadePortion === null || hit.name === null) {
        return true;
      } else {
        return false;
      }
    });
  }

  completeGroupItems(): void {
    this.newGrouping.items = this.form.value.groupItems;
    this.newGrouping.items.forEach((hit: { name: any; code: string; },index: number) => {
      if (hit.name === null && hit.code) {
        let food = this.foods.find(f => f.code === hit.code)
        if (food)
          this.newGrouping.items[index].name = food.name;
        else
          window.alert('Alimento não encontrado com o código ' + hit.code)
      }
    })
  }
}