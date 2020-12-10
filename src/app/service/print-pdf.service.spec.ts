import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';

import { PrintPDFService } from './print-pdf.service';

describe('PrintPDFService', () => {
  let service: PrintPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent
      ],
      imports: [
            HttpClientModule
       
      ],
      providers: [
        { provide: 'BASE_URL', useValue: environment.baseRestUrl },
        { provide: 'DOMAIN_URL', useValue: environment.domainUrl }
      ],

    })
    service = TestBed.inject(PrintPDFService);
  });


  it('Print pdf Service works', () => {
    expect(service.generatePdf("300.00",[{"name":"Wrenches","rate":"20","quantity":"30","amount":"600"}])).toBeTruthy();
  });

});
