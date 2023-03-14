import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMockData: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.get(ProductsService);
    httpMockData = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should get the products successfully', () => {
    service.getProduct().subscribe((data: any) => {
      expect(data).toBe({
        id: '1',
        image:
          'https://cdn.shopify.com/s/files/1/0633/2507/7729/products/5copy_1120x.jpg?v=1658915930',
        description: "SXV 'LOS ANGELES' Printed Hoodie",
        price: 699,
      });
    });
  });
});
