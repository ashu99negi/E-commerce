import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { of } from 'rxjs';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../product';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('CartComponent', () => {
  let component: CartComponent;
  let PRODUCTS: Product[] = [];
  let mockCartService: any;
  let mockAuthService: any;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    PRODUCTS = [
      {
        id: 1,
        image: 'image1',
        description: 'description 1',
        price: 100,
        quantity: 100,
        total: 100,
      },
      {
        id: 2,
        image: 'image2',
        description: 'description 2',
        price: 200,
        quantity: 200,
        total: 200,
      },
      {
        id: 3,
        image: 'image3',
        description: 'description 3',
        price: 300,
        quantity: 300,
        total: 300,
      },
    ];
    mockCartService = jasmine.createSpyObj([
      'getProduct',
      'addToCart',
      'deleteItem',
    ]);
    mockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    component = new CartComponent(mockCartService, mockAuthService);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
        HttpClient,
      ],
    }).compileComponents();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('removeItem', () => {
    beforeEach(() => {
      mockCartService.deleteItem.and.returnValue({ subscribe: () => {} });
      component.products = PRODUCTS;
    });
    it('should delete the selected item from the products', () => {
      component.removeItem(PRODUCTS[1]);
      fixture.detectChanges();
      expect(component.products.length).toBe(2);
    });

    it('should delete the actual selected item in the products', () => {
      component.removeItem(PRODUCTS[1]);

      for (let product of component.products) {
        expect(product).not.toEqual(PRODUCTS[1]);
      }
    });
  });
});
