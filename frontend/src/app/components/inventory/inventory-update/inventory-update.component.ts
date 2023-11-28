import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-update',
  templateUrl: './inventory-update.component.html',
  styleUrls: ['./inventory-update.component.css']
})
export class InventoryUpdateComponent implements OnInit {

  inventory: Inventory

  constructor(private inventoryService: InventoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.inventoryService.readById(id).subscribe(inventory => {
      this.inventory = inventory;
    });
  }

  updateFoodInventory(): void {
    if (this.inventory.foodCode === null || this.inventory.amount === null) {
      this.inventoryService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.inventoryService.update(this.inventory).subscribe(() => {
        this.inventoryService.showMessage('Alimento atualizado com sucesso!', 'green-snackbar');
        this.router.navigate(['/inventory'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/inventory'])
  }
}