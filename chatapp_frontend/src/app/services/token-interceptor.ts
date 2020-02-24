import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // return next.handle(req);
        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const token = this.tokenService.getToken();

        if (token) {
            headersConfig['Authorization'] = `bearer ${token}`;
        }

        const _req = req.clone({ setHeaders: headersConfig });

        return next.handle(_req);
    }
}
