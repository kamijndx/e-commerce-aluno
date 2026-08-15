import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router=inject(Router);
  const token = authService.obterToken();

  // LOG REQUEST
  console.log('REQUEST', req.url);

  // TOKEN
  const novaReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  // SEGUE COM A NOVA REQUEST + LOG RESPONSE
  return next(novaReq).pipe(
    tap({
      next: (event) => console.log('RESPONSE:', event),
      error: (error) => console.error('ERRO:', error),
    }),

    catchError((error) => {
      console.error('ERRO GLOBAL:', error);

      if (error.status === 401) {
        console.warn('Não autorizado!');
        authService.logout();
        router.navigateByUrl('/login')
      }

      if (error.status === 500) {
        console.warn('Erro interno do servidor!');
      }
      if(error.status === 403){
        console.warn('Acesso Proibido,Usuario sem Permissão!');
        router.navigateByUrl('/produto');
      }

      return throwError(() => error);
    }),
  );
};