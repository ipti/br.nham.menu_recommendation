import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {

  inventory: Inventory = {
    foodCode: null,
    amount: null
  }

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit(): void {
  }
  
  addFoodInventory(): void {
    if (this.inventory.foodCode === null || this.inventory.amount === null) {
      this.inventoryService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.inventoryService.create(this.inventory).subscribe(() => {
        this.inventoryService.showMessage('Alimento cadastrado no estoque com sucesso!', 'green-snackbar');
        this.router.navigate(['/inventory']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/inventory']);
  }
}
