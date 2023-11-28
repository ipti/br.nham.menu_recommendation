import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-inventory-crud',
  templateUrl: './inventory-crud.component.html',
  styleUrls: ['./inventory-crud.component.css']
})
export class InventoryCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Estoque',
      routeUrl: '/inventory'
    }
  }

  ngOnInit(): void {
  }

  navigateToInventoryCreate(): void {
    this.router.navigate(['/inventory/create'])
  }

}