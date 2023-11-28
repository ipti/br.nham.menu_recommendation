import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FoodCrudComponent } from './views/food-crud/food-crud.component';
import { FoodCreateComponent } from './components/food/food-create/food-create.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoodReadComponent } from './components/food/food-read/food-read.component';
import { FoodReadMaterialComponent } from './components/food/food-read-material/food-read-material.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './CustomPaginatorConfiguration';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FoodUpdateComponent } from './components/food/food-update/food-update.component';
import { FoodDeleteComponent } from './components/food/food-delete/food-delete.component';
import { InventoryCrudComponent } from './views/inventory-crud/inventory-crud.component';
import { GroupingCrudComponent } from './views/grouping-crud/grouping-crud.component';
import { MenuCrudComponent } from './views/menu-crud/menu-crud.component';
import { InventoryDeleteComponent } from './components/inventory/inventory-delete/inventory-delete.component';
import { InventoryCreateComponent } from './components/inventory/inventory-create/inventory-create.component';
import { InventoryReadComponent } from './components/inventory/inventory-read/inventory-read.component';
import { InventoryUpdateComponent } from './components/inventory/inventory-update/inventory-update.component';
import { GroupingUpdateComponent } from './components/grouping/grouping-update/grouping-update.component';
import { GroupingDeleteComponent } from './components/grouping/grouping-delete/grouping-delete.component';
import { GroupingCreateComponent } from './components/grouping/grouping-create/grouping-create.component';
import { GroupingReadComponent } from './components/grouping/grouping-read/grouping-read.component';
import { MenuReadComponent } from './components/menu/menu-read/menu-read.component';
import { MenuCreateComponent } from './components/menu/menu-create/menu-create.component';
import { MenuUpdateComponent } from './components/menu/menu-update/menu-update.component';
import { MenuDeleteComponent } from './components/menu/menu-delete/menu-delete.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


import {MatExpansionModule} from '@angular/material/expansion';
import { ExpansionComponent } from './components/dashboard/expansion/expansion.component';
import { ActionsComponent } from './components/dashboard/actions/actions.component';
import { IndicatorsComponent } from './components/dashboard/indicators/indicators.component';
import { SearchComponent } from './components/dashboard/search/search.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    DashboardComponent,
    FoodCrudComponent,
    FoodCreateComponent,
    FoodReadComponent,
    FoodReadMaterialComponent,
    FoodUpdateComponent,
    FoodDeleteComponent,
    InventoryCrudComponent,
    GroupingCrudComponent,
    MenuCrudComponent,
    InventoryDeleteComponent,
    InventoryCreateComponent,
    InventoryReadComponent,
    InventoryUpdateComponent,
    GroupingUpdateComponent,
    GroupingDeleteComponent,
    GroupingCreateComponent,
    GroupingReadComponent,
    MenuReadComponent,
    MenuCreateComponent,
    MenuUpdateComponent,
    MenuDeleteComponent,
    ExpansionComponent,
    ActionsComponent,
    IndicatorsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    { 
      provide: MatPaginatorIntl, 
      useValue: CustomPaginator() 
    }, 
    { 
      provide: LOCALE_ID, 
      useValue: 'pt-BR' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
