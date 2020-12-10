import { TestBed, getTestBed } from "@angular/core/testing";
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { AuthGuard } from './auth-guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';


describe('AuthGuard', () => {
    let injector: TestBed;
    let authService: AuthService
    let guard: AuthGuard;
    let routeMock: any = { snapshot: {}};
    let routeStateMock: any = { snapshot: {}, url: '/cookies'};
    let routerMock = {navigate: jasmine.createSpy('navigate')}
    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [AuthGuard, { provide: Router, useValue: routerMock },
          { provide: 'DOMAIN_URL', useValue: environment.domainUrl }],
          imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        authService = injector.get(AuthService);
        guard = injector.get(AuthGuard);
    })

    it('should allow the authenticated user to access app', () => {
        spyOn(authService, 'isloggedIn').and.returnValue(true);
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
      });

      it('should redirect an unauthenticated user to the login route', () => {
        spyOn(authService, 'isloggedIn').and.returnValue(false);
        expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
        expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/login']); 
      });
  });