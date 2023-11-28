import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-menu-crud',
  templateUrl: './menu-crud.component.html',
  styleUrls: ['./menu-crud.component.css']
})
export class MenuCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Cardápios',
      routeUrl: '/menu'
    }
  }

  ngOnInit(): void {
  }

  navigateToMenuCreate(): void {
    this.router.navigate(['/menu/create'])
  }

}
