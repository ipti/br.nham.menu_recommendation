import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-read',
  templateUrl: './menu-read.component.html',
  styleUrls: ['./menu-read.component.css']
})
export class MenuReadComponent implements OnInit {

  menu: Menu[];
  displayedColumns = ['code', 'name', 'gramsPortion', 'replaceable'];
  // displayedColumns = ['code', 'name', 'replaceable'];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.read().subscribe(menu => {
      this.menu = menu;
    })
  }

}
