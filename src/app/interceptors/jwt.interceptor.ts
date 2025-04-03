import { HttpInterceptorFn } from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }

  return next(request);
};
