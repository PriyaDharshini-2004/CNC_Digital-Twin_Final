import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { MachineDetailsComponent } from './machine-details/machine-details';
import { AnalyticsComponent } from './analytics/analytics';
import { MasterDataComponent } from './master-data/master-data';
import { ReportsComponent } from './reports/reports';
import { Modelling3dComponent } from './3d-modelling/3d-modelling';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] },
  { path: 'master-data', component: MasterDataComponent, canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: '3d-modelling', component: Modelling3dComponent, canActivate: [authGuard] },
  { path: 'machine-details/:machineId', component: MachineDetailsComponent, canActivate: [authGuard] }
];
