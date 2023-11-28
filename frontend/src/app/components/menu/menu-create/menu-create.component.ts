import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Food } from '../../food/food.model';
import { FoodService } from '../../food/food.service';
import { MenuService } from '../menu.service';
import { MenuItems } from '../menuItems.model';

@Component({
  selector: 'app-menu-create',
  templateUrl: './menu-create.component.html',
  styleUrls: ['./menu-create.component.css']
})
export class MenuCreateComponent implements OnInit {

  newMenu: any = {schooltype: null, mealtype: null, code: null, description: null};
  form: FormGroup;
  displayedColumns = ['delete', 'code', 'gramsPortion', 'replaceable']
  // displayedColumns = ['delete', 'code', 'replaceable']
  foods: Food[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private menuService: MenuService,
    private foodService: FoodService
  ) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      menuItems: this._formBuilder.array([])
    });

    const fgs = [{code: null, replaceable: null, gramsPortion: 0}].map(MenuItems.asFormGroup);
    // const fgs = [{code: null, replaceable: null}].map(MenuItems.asFormGroup);
    this.form.setControl('menuItems', new FormArray(fgs));

    this.foodService.read().subscribe(foods => {
      this.foods = foods;
    });
  }

  get menuItems(): FormArray {
    return this.form.get('menuItems') as FormArray;
  }

  cancel(): void {
    this.router.navigate(['/menu'])
  }

  addFood(currentForm: any): void {
    currentForm.menuItems.push({})
    const fgs = currentForm.menuItems.map(MenuItems.asFormGroup);
    this.form.setControl('menuItems', new FormArray(fgs));
  }

  deleteFood(row: any, currentForm: any): void {
    row = row.value;
    let index = currentForm.menuItems.findIndex((a: any) => {
      if (a.code === row.code && a.replaceable === row.replaceable && a.gramsPortion === row.gramsPortion) {
      // if (a.code === row.code && a.replaceable === row.replaceable) {
        return true;
      } else {
        return false;
      }
    })

    if (index > -1) {
      currentForm.menuItems.splice(index, 1);
      const fgs = currentForm.menuItems.map(MenuItems.asFormGroup);
      this.form.setControl('menuItems', new FormArray(fgs));
    }
  }

  createMenu(): void {
    
    this.completeMenuItems();

    if (this.checkForm()) {
      this.menuService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.menuService.create(this.newMenu).subscribe(() => {
        this.menuService.showMessage('Cardápio criado com sucesso!', 'green-snackbar');
        this.router.navigate(['/menu'])
      })
    }
  }

  checkForm() {
    let result = false;
    if (this.newMenu === null || this.newMenu.description === null || this.form.value.menuItems.length === 0 ||
        this.newMenu.mealtype === null || this.newMenu.schooltype || this.newMenu.code === null) {
        result = true;
    }
    result = this.form.value.menuItems.some((hit: { code: any; replaceable: any; gramsPortion: number}) => {
    // result = this.form.value.menuItems.some((hit: { code: any; replaceable: any;}) => {
      if (hit.code === null || (hit.replaceable !== true && hit.replaceable !== false) || hit.gramsPortion === 0) {
            console.log(hit.code, hit.replaceable)
            return true;
      } else {
        return false;
      }
    });

    return result;
  }

  completeMenuItems(): void {
    this.newMenu.items = this.form.value.menuItems;
    this.newMenu.items.forEach((hit: { replaceable: string; code: string; gramsPortion: number },index: number) => {
    // this.newMenu.items.forEach((hit: { replaceable: string; code: string; },index: number) => {
      if (hit.code) {
        let food = this.foods.find(f => f.code === hit.code)
        if (food)
          this.newMenu.items[index].name = food.name;
        else
          window.alert('Alimento não encontrado com o código ' + hit.code)
      }

      if (hit.replaceable) {
        if (hit.replaceable === "Sim" || hit.replaceable === "sim" || hit.replaceable === "SIM")
          this.newMenu.items[index].replaceable = true;
        else if (hit.replaceable === "SIM" || hit.replaceable === "Não" || hit.replaceable === "não" || hit.replaceable === "NÃO" ||
                 hit.replaceable === "nao" || hit.replaceable === "NAO" || hit.replaceable === "Nao")
          this.newMenu.items[index].replaceable = false;
        else
          window.alert('Responda o campo "Substituível?" com "Sim ou Não"');
      }
    })
  }
}
