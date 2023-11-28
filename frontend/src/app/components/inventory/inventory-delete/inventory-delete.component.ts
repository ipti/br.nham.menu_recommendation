import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../inventory.model';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory-delete',
  templateUrl: './inventory-delete.component.html',
  styleUrls: ['./inventory-delete.component.css']
})
export class InventoryDeleteComponent implements OnInit {

  inventory: Inventory

  constructor(private inventoryService: InventoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.inventoryService.readById(id).subscribe(inventory => {
      this.inventory = inventory;
    });
  }

  deleteFoodInventory(): void {
    if (this.inventory.foodCode === null || this.inventory.amount === null) {
      this.inventoryService.showMessage('Erro: Campo obrigatório não preenchido!', 'red-snackbar');
    } else {
      this.inventoryService.delete(String(this.inventory.id)).subscribe(() => {
        this.inventoryService.showMessage('Alimento removido do estoque com sucesso!', 'green-snackbar');
        this.cancel();
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/inventory'])
  }

}

