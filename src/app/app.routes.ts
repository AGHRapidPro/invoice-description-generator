import { Routes } from '@angular/router';
import {MainPanelComponent} from "./main-panel/main-panel.component";
import {UserManagementComponent} from "./user-management/user-management.component";

export const routes: Routes = [
  { path: '', component: MainPanelComponent },
  { path: 'user-dashboard', component: UserManagementComponent }
];
