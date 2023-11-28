import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-grouping-crud',
  templateUrl: './grouping-crud.component.html',
  styleUrls: ['./grouping-crud.component.css']
})
export class GroupingCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    this.headerService.headerData = {
      title: 'Cadastro de Agrupamentos',
      routeUrl: '/grouping'
    }
  }

  ngOnInit(): void {
  }

  navigateToGroupingCreate(): void {
    this.router.navigate(['/grouping/create'])
  }

}
