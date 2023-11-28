import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FoodCrudComponent } from './views/food-crud/food-crud.component';
import { FoodCreateComponent } from './components/food/food-create/food-create.component';
import { FoodUpdateComponent } from './components/food/food-update/food-update.component';
import { FoodDeleteComponent } from './components/food/food-delete/food-delete.component';
import { InventoryCrudComponent } from './views/inventory-crud/inventory-crud.component';
import { InventoryCreateComponent } from './components/inventory/inventory-create/inventory-create.component';
import { InventoryUpdateComponent } from './components/inventory/inventory-update/inventory-update.component';
import { InventoryDeleteComponent } from './components/inventory/inventory-delete/inventory-delete.component';
import { GroupingCrudComponent } from './views/grouping-crud/grouping-crud.component';
import { GroupingCreateComponent } from './components/grouping/grouping-create/grouping-create.component';
import { GroupingUpdateComponent } from './components/grouping/grouping-update/grouping-update.component';
import { GroupingDeleteComponent } from './components/grouping/grouping-delete/grouping-delete.component';
import { MenuCrudComponent } from './views/menu-crud/menu-crud.component';
import { MenuCreateComponent } from './components/menu/menu-create/menu-create.component';
import { MenuUpdateComponent } from './components/menu/menu-update/menu-update.component';
import { MenuDeleteComponent } from './components/menu/menu-delete/menu-delete.component';
import { SearchComponent } from './components/dashboard/search/search.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "foods",
    component: FoodCrudComponent
  },
  {
    path: "foods/create",
    component: FoodCreateComponent
  },
  {
    path: "foods/update/:id",
    component: FoodUpdateComponent
  },
  {
    path: "foods/delete/:id",
    component: FoodDeleteComponent
  },
  {
    path: "inventory",
    component: InventoryCrudComponent
  },
  {
    path: "inventory/create",
    component: InventoryCreateComponent
  },
  {
    path: "inventory/update/:id",
    component: InventoryUpdateComponent
  },
  {
    path: "inventory/delete/:id",
    component: InventoryDeleteComponent
  },
  {
    path: "grouping",
    component: GroupingCrudComponent
  },
  {
    path: "grouping/create",
    component: GroupingCreateComponent
  },
  {
    path: "grouping/update/:id",
    component: GroupingUpdateComponent
  },
  {
    path: "grouping/delete/:id",
    component: GroupingDeleteComponent
  },
  {
    path: "menu",
    component: MenuCrudComponent
  },
  {
    path: "menu/create",
    component: MenuCreateComponent
  },
  {
    path: "menu/update/:id",
    component: MenuUpdateComponent
  },
  {
    path: "menu/delete/:id",
    component: MenuDeleteComponent
  },
  {
    path: "dashboard/search",
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
