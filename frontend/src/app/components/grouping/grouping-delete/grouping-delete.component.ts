import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Grouping } from '../grouping.model';
import { GroupingService } from '../grouping.service';

@Component({
  selector: 'app-grouping-delete',
  templateUrl: './grouping-delete.component.html',
  styleUrls: ['./grouping-delete.component.css']
})
export class GroupingDeleteComponent implements OnInit {

  grouping: Grouping

  constructor(private groupingService: GroupingService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.groupingService.readById(id).subscribe(grouping => {
      this.grouping = grouping;
    });
  }

  deleteGrouping(): void {
    if (this.grouping === null || this.grouping.id === null) {
      this.groupingService.showMessage('Erro ao excluir agrupamento!', 'red-snackbar');
    } else {
      this.groupingService.delete(String(this.grouping.id)).subscribe(() => {
        this.groupingService.showMessage('Agrupamento removido com sucesso!', 'green-snackbar');
        this.router.navigate(['/grouping'])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['/grouping']);
  }

}
