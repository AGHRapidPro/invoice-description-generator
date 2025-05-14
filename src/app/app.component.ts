import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { NgOptimizedImage } from "@angular/common";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'angular-multi-router-outlet';

  constructor(private router: Router) {}

  navigateToUserDashboard() {
    this.router.navigate(['user-dashboard']);
  }

  navigateToGrantDashboard() {
    this.router.navigate(['grant-dashboard']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
