import {
  Component, ElementRef, OnInit
} from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupingService } from '../grouping.service';
import { FoodService } from '../../food/food.service';
import { Food } from '../../food/food.model';
import { GroupItems } from '../groupItems.model';

@Component({
  selector: 'app-grouping-update',
  templateUrl: './grouping-update.component.html',
  styleUrls: ['./grouping-update.component.css']
})
export class GroupingUpdateComponent implements OnInit {
  groupingRequest: any;
  form: FormGroup;
  displayedColumns = ['delete', 'code', 'gramsPortion', 'homemadePortion']
  foods: Food[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private groupingService: GroupingService,
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      groupItems: this._formBuilder.array([])
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.groupingService.readById(id).subscribe(grouping => {
      this.groupingRequest = grouping;
      const fgs = grouping.items.map(GroupItems.asFormGroup);
      this.form.setControl('groupItems', new FormArray(fgs));
    });

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

  // onChange(e: any, element: any): void {
  //   console.log('eeee', e.target.value)
  //   console.log('eeee', e.target.getAttribute('formControlName'))
  //   console.log('eeee', e.target.id)
  // }

  updateGrouping(): void {
    
    this.updateGroupItems();

    if (this.groupingRequest === null || this.groupingRequest.name === null || this.form.value.groupItems.length === 0 || this.checkForm()) {
      this.groupingService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.groupingService.update(this.groupingRequest).subscribe(() => {
        this.groupingService.showMessage('Agrupamento atualizado com sucesso!', 'green-snackbar');
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

  updateGroupItems(): void {
    this.groupingRequest.items = this.form.value.groupItems;
    this.groupingRequest.items.forEach((hit: { name: any; code: string; },index: number) => {
      if (hit.name === null && hit.code) {
        let food = this.foods.find(f => f.code === hit.code)
        if (food)
          this.groupingRequest.items[index].name = food.name;
        else
          window.alert('Alimento não encontrado com o código ' + hit.code)
      }
    })
  }
}

