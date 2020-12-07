import { TestBed } from '@angular/core/testing';

import { PrintPDFService } from './print-pdf.service';

describe('PrintPDFService', () => {
  let service: PrintPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
