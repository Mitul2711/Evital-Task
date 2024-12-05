import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';
  url = 'https://dev-api.evitalrx.in/v1/fulfillment/';

  getMedicine(data: any) {
    
    const formData = new FormData();
    formData.append('apikey', this.apikey);
    formData.append('medicine_ids', data);

    return this.http.post(`${this.url}/medicines/view`, formData);

  }

}

