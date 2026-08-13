import { Component, signal,inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { AuthService } from './core/services/auth.services';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './shared/Layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, MatButtonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-aluno');
  nomeLoja = 'Pezao tec';
  authService = inject(AuthService)
}
