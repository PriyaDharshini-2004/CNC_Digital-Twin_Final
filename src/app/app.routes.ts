import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { MachineDetailsComponent } from './machine-details/machine-details';
import { AnalyticsComponent } from './analytics/analytics';
import { MasterDataComponent } from './master-data/master-data';
import { ReportsComponent } from './reports/reports';
import { Modelling3dComponent } from './3d-modelling/3d-modelling';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'master-data', component: MasterDataComponent },
  { path: 'reports', component: ReportsComponent },
  { path: '3d-modelling', component: Modelling3dComponent },
  { path: 'machine-details/:machineId', component: MachineDetailsComponent }
];
