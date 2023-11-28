import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../menu.model';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu-delete',
  templateUrl: './menu-delete.component.html',
  styleUrls: ['./menu-delete.component.css']
})
export class MenuDeleteComponent implements OnInit {

  menu: Menu

  constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.menuService.readById(id).subscribe(menu => {
      this.menu = menu;
    });
  }

  deleteMenu(): void {
    if (this.menu === null || this.menu.id === null) {
      this.menuService.showMessage('Erro ao excluir cardápio!', 'red-snackbar');
    } else {
      this.menuService.delete(String(this.menu.id)).subscribe(() => {
        this.menuService.showMessage('Cardápio removido com sucesso!', 'green-snackbar');
        this.router.navigate(['/menu'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/menu']);
  }

}

