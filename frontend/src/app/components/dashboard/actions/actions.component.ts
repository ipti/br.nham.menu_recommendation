import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  successResultRunRS: any
  loadingBt1 = false;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
  }

  runRecommendationSystem(): void {
    this.loadingBt1 = true;
    this.dashboardService.runRS().subscribe(res => {
        this.successResultRunRS = res;
        this.loadingBt1 = false;
        this.dashboardService.showMessage('Método executado com sucesso!', 'green-snackbar');
    })
  }

  navigateToSearch(): void {
    this.router.navigate(['/dashboard/search']);
  }
}
