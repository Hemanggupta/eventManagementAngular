import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../auth/login/login.service';

@Component({
  selector: 'app-authorized-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.scss'
})
export class AuthorizedLayoutComponent implements OnInit {
  constructor(private readonly authService: LoginService) {}

  ngOnInit() {}

  logout() {
    this.authService.logoutUser();
  }
}
