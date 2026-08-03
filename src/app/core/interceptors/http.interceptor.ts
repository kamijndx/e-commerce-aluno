import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    
    console.log('Inteceptando Requisição: ', req.url);
    
    //! Aqui você pode adicionar lógica para modificar a requisição antes de enviá-la, como adicionar cabeçalhos, tokens de autenticação, etc.
    const token = 'fake-token-jwt';
    
    const novaReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro de Requisição: ', error)
        }),

    

    );
};