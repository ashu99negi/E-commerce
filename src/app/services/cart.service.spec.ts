import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMockData: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });
    service = TestBed.get(CartService);
    httpMockData = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete the selected product', () => {
    service.deleteItem(3).subscribe((data: any) => {
      expect(data).toBe(3);
    });
    const req = httpMockData.expectOne(
      `http://localhost:3000/cart/3`,
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(3);

    httpMockData.verify();
  });

  it('should post the correct data', () => {
    service
      .addToCart({
        product: {
          id: '1',
          image:
            'https://cdn.shopify.com/s/files/1/0633/2507/7729/products/5copy_1120x.jpg?v=1658915930',
          description: "SXV 'LOS ANGELES' Printed Hoodie",
          price: 699,
        },
      })
      .subscribe((data: any) => {
        expect(data.product.id).toBe('1');
      });

    const req = httpMockData.expectOne(service.url);
    expect(req.request.method).toBe('POST');

    req.flush({
      product: {
        id: '1',
        image:
          'https://cdn.shopify.com/s/files/1/0633/2507/7729/products/5copy_1120x.jpg?v=1658915930',
        description: "SXV 'LOS ANGELES' Printed Hoodie",
        price: 699,
      },
    });

    httpMockData.verify();
  });

  it('should get the products successfully', () => {
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
