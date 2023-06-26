import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Product, SearchProductResponse } from "../../../../products";
import { ProductService } from "../product-service/product.service";
import { of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
} from "rxjs/operators";

@Component({
  selector: "product-search",
  templateUrl: "./product-search.component.html",
  styleUrls: ["./product-search.component.css"],
})
export class ProductSearchComponent implements OnInit {
  products: Product[] = [];
  searchText = new FormControl("");
  searchResult: Product[] = [];
  paginationStart = 0;
  paginationEnd = 10;
  paginationAmount = 10;
  shouldLoadData = "true";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(
        filter(
          (searchStr: string | null): searchStr is string => searchStr !== null,
        ),
        debounceTime(500),
        distinctUntilChanged(),
        exhaustMap(() => {
          if (this.shouldLoadData === "true") {
            this.shouldLoadData = "loading";
            this.initialLoadAndSearch();
          }
          return of(null);
        }),
      )
      .subscribe(() => {
        this.paginationStart = 0;
        this.paginationEnd = 10;
        if (this.products.length === 0) {
          this.searchResult = [];
        }

        if (this.searchText.value == "") {
          this.searchResult = this.products;
          return;
        }
        this.searchResult = this.searchData();
      });
  }

  async initialLoadAndSearch(): Promise<void> {
    if (this.searchText.value !== null) {
      const data: SearchProductResponse = await this.productService
        .getProducts();
      this.products = data.content;
      this.shouldLoadData = "done";

      if (!this.searchText.value) {
        return;
      }
      this.searchResult = this.searchData();
    }
  }

  searchData(): Product[] {
    const productArray = this.products;
    const filteredProducts = productArray.filter((product) => {
      if (!this.searchText.value) return;
      const words = this.searchText.value.toLowerCase().split(" ");
      return words.every((word) => product.title.toLowerCase().includes(word));
    });
    return filteredProducts;
  }

  // TODO: would be faster to have pagination on the server-side
  // since we wouldnt have to load all the products from the server and filter
  // them client-side, doing it server-side would reduce the amount of data that needs
  // to be transfered.
  nextPage(): void {
    if (this.paginationEnd > this.searchResult.length) return;
    this.paginationStart += this.paginationAmount;
    this.paginationEnd += this.paginationAmount;
  }

  prevPage(): void {
    if (this.paginationStart <= 0) return;
    this.paginationStart -= this.paginationAmount;
    this.paginationEnd -= this.paginationAmount;
  }
}
