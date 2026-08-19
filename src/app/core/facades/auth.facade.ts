import { Injectable, inject } from "@angular/core";
import { AuthService} from "../services/auth.services";

 @Injectable({providedIn: 'root'})

 export class AuthFacade {
    private authService = inject(AuthService);

  usuarioAtual = this.authService.usuarioAtual;
  estaLogado = this.authService.estaLogado;
  token =  this.authService.token;
  admin =this.authService.admin;

  realizarLogin(email:string, senha:string): boolean{
    return this.authService.login(email,senha);
  }
  sair(){
    this.authService.logout();
  }
  obterToken(){
    return this.authService.obterToken();
  }
  obterPerfil(){
    return this.authService.obterPerfil;
  }
 }