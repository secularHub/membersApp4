import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from "./members/members.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";
import { LoginComponent } from "./login/login.component";
import { NametagsComponent } from './nametags/nametags.component';
import { ReportsComponent } from './reports/reports.component';
import { LocationStrategy } from "@angular/common";
import { AppComponent } from "./app.component";
import { AuthGuard } from './common/auth.service';
import {EmailComponent} from "./email/email.component";
import {SignupComponent} from "./signup/signup.component";

// TODO: create some auth routes
export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'members', component: MembersComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'nametags', component: NametagsComponent },
  { path: 'reports', component: ReportsComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  AppRoutes
);
