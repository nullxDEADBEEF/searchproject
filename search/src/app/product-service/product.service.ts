import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import type { Product, SearchProductResponse } from "../../../../products";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url = "assets/products.json";

  constructor(private http: HttpClient) { }

  async getProducts(): Promise<SearchProductResponse> {
    const request = this.http.get<SearchProductResponse>(this.url);
    return await firstValueFrom(request);
  }
}
