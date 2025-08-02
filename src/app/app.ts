import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard';
import { AnalyticsComponent } from './analytics/analytics';
import { MasterDataComponent } from './master-data/master-data';
import { ReportsComponent } from './reports/reports';
import { Modelling3dComponent } from './3d-modelling/3d-modelling';
import { MachineDetailsComponent } from './machine-details/machine-details';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    RouterModule,
    DashboardComponent,
    AnalyticsComponent,
    MasterDataComponent,
    ReportsComponent,
    Modelling3dComponent,
    MachineDetailsComponent,
    ReactiveFormsModule,
    MatMenuModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  selectedTabIndex = 0;
  lastUpdated = new Date().toLocaleTimeString();

  constructor(public router: Router) {
    this.syncTabWithRoute();
    this.router.events.subscribe(() => {
      this.syncTabWithRoute();
    });
  }
  logout(): void {
  // Example logout logic
  console.log('Logging out...');
  // Redirect, clear tokens, etc.
}


  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    switch (index) {
      case 0: this.router.navigate(['/dashboard']); break;
      case 1: this.router.navigate(['/analytics']); break;
      case 2: this.router.navigate(['/master-data']); break;
      case 3: this.router.navigate(['/reports']); break;
      case 4: this.router.navigate(['/3d-modelling']); break;
    }
  }

  private syncTabWithRoute(): void {
    const url = this.router.url;
    if (url.startsWith('/analytics')) this.selectedTabIndex = 1;
    else if (url.startsWith('/master-data')) this.selectedTabIndex = 2;
    else if (url.startsWith('/reports')) this.selectedTabIndex = 3;
    else if (url.startsWith('/3d-modelling')) this.selectedTabIndex = 4;
    else this.selectedTabIndex = 0;
  }
}
