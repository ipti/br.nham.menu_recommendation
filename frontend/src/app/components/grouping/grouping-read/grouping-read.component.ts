import { Component, OnInit } from '@angular/core';
import { GroupingService } from '../grouping.service';
import { Grouping } from '../grouping.model';

@Component({
  selector: 'app-grouping-read',
  templateUrl: './grouping-read.component.html',
  styleUrls: ['./grouping-read.component.css']
})
export class GroupingReadComponent implements OnInit {

  grouping: Grouping[];
  displayedColumns = ['code', 'name', 'gramsPortion', 'homemadePortion'];

  constructor(private groupingService: GroupingService) { }

  ngOnInit(): void {
    this.groupingService.read().subscribe(grouping => {
      this.grouping = grouping;
      // console.log(grouping)
    })
  }

}
