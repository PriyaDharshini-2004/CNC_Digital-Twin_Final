import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
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

  constructor(public router: Router, private authService: AuthService) {
    this.syncTabWithRoute();
    this.router.events.subscribe(() => {
      this.syncTabWithRoute();
    });
  }
  logout(): void {
    this.authService.logout();
  }
  
  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    const routes = ['dashboard', 'analytics', 'master-data', 'reports', '3d-modelling'];
    if (index >= 0 && index < routes.length) {
      this.router.navigate([`/${routes[index]}`]);
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
