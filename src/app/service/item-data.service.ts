import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../model/item';

@Injectable({
  providedIn: 'root'
})
export class ItemDataService {

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }
  
  createItem(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateItem(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteItem(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
