import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodService } from '../../food/food.service';
import { DashboardService } from '../dashboard.service';
import { Food } from '../../food/food.model';
import { MenuService } from '../../menu/menu.service';
import { Menu } from '../../menu/menu.model';

import { takeUntil, take } from 'rxjs/operators';
// import { ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/map';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { Grouping } from '../../grouping/grouping.model';
import { GroupingService } from '../../grouping/grouping.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  options: FormGroup;
  colorControl = new FormControl('primary');
  fontSizeControl = new FormControl(16, Validators.min(10));
  fontStyleControl = new FormControl();
  fontStyleControl2 = new FormControl();
  fontStyleControl3 = new FormControl();
  fontStyle?: string;
  foodList: Food[];
  menuList: Menu[];
  groupingList: Grouping[];
  searchResult: any = {};
  menuSelected: string = null;
  foodSelected: string = null;
  portionSelected: number = 100;
  groupSelected: Grouping = null;

  items: string[];


  /** control for the selected bank for multi-selection */
  public control: FormControl = new FormControl();

  private _onDestroy = new Subject<void>();
  public filteredRecords: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('Select') select: MatSelect;

  constructor(
    private router: Router, fb: FormBuilder,
    private foodService: FoodService,
    private dashboardService: DashboardService,
    private menuService: MenuService,
    private groupingService: GroupingService
  ) {
    this.options = fb.group({
      color: this.colorControl,
      fontSize: this.fontSizeControl,
      portionSelected: this.portionSelected
    });
  }

  getFontSize() {
    return Math.max(10, this.fontSizeControl.value);
  }

  ngOnInit(): void {
    this.setInitialValue();
    // set initial selection
    this.control.setValue([]);
    // load the initial bank list
    // this.filteredRecords.next(this.items.slice());

    this.control.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });
  }

  getFoodList(group: Grouping): void {
      this.foodService.read().subscribe(foods => {
        if (group) {
          this.foodList = foods.filter(hit => group.items.some(((f: { code: string; }) => f.code === hit.code)));
        } else {
          this.foodList = foods;
        }
        this.items = (this.foodList || []).map(f => { return 'ID: ' + f.id + ' | COD: ' + f.code + ' | ' + f.name })
        this.filteredRecords.next(this.items.slice());
      });
  }

  getMenuList(): void {
    if (this.fontStyleControl.value === 'menu') {
      this.menuService.read().subscribe(menu => {
        this.menuList = menu;
        this.items = (menu || []).map(m => { return 'COD: ' + m.code + ' | ' + m.description })
        this.filteredRecords.next(this.items.slice());
      });
    }
  }

  getGroupingList(): void {
    if (this.fontStyleControl.value === 'food') {
      this.groupingService.read().subscribe(grouping => {
        this.groupingList = grouping;
      });
    }
  }

  search(): void {
    if ((this.fontStyleControl.value === 'menu' || this.fontStyleControl.value === 'food') &&
        (this.menuSelected || this.foodSelected) 
    ) {
      if (this.fontStyleControl.value === 'menu' && this.fontStyleControl2.value === null && this.fontStyleControl3.value === null) {
        this.dashboardService.showMessage('Por favor, preencha os campos obrigatórios.', 'red-snackbar');
      } else {
        // this.loadingBt1 = true;
        let param = this.fontStyleControl.value === 'menu' ? {'context': 'menu', 'menuSearchType': this.fontStyleControl2.value, 'menuCode': /COD: (.*) \|/.exec(this.menuSelected)[1]} : {'context': 'food', 'foodCode': /COD: (.*) \|/.exec(this.foodSelected)[1], 'inputGramsPortion': this.portionSelected};
        this.dashboardService.getResultRS(param).subscribe(res => {
          // this.successResultRunRS = res;
          // this.loadingBt1 = false;
          this.searchResult = res;
          this.dashboardService.showMessage('Consulta concluída!', 'green-snackbar');
        })
      }
    } else {
      this.dashboardService.showMessage('Por favor, preencha os campos obrigatórios.', 'red-snackbar');
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  private setInitialValue() {
    try {
      this.filteredRecords
        .pipe(take(1), takeUntil(this._onDestroy))
        .subscribe(() => {
          if (this.select)
            this.select.compareWith = (a: any, b: any) => a === b;
        });
    } catch (e) { }
  }

  private filterBanksMulti() {
    if (!this.items) {
      return;
    }
    // get the search keyword
    let search = this.control.value;
    if (!search) {
      this.filteredRecords.next(this.items.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    if (search.length >= 1) {
      // filter
      this.filteredRecords.next(
        this.items.filter(item => item.toLowerCase().indexOf(search) > -1)
      );
    }
  }

  changeMatOption(value: any): void {
    if (this.fontStyleControl.value === 'menu') {
      this.menuSelected = value;
    } else if (this.fontStyleControl.value === 'food') {
      this.groupSelected = this.groupingList.find(hit => hit.id === Number(value));
      this.getFoodList(this.groupSelected);
    } else {
      this.dashboardService.showMessage('Por favor, selecione o tipo de consulta.', 'red-snackbar');
    }
  }

  changeFoodOption(value: any): void {
    this.foodSelected = value;
  }

  // changePortionSelected(value: number): void {
  //   this.portionSelected = value;
  // }

  changePortionValue(value: any): void {
    this.portionSelected = Number(value.target.value);
  }
}
