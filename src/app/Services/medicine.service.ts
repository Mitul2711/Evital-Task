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

  searchMedicine(data: any) {
    const formData = new FormData();
    formData.append('apikey', this.apikey);
    formData.append('searchstring', data);

    return this.http.post(`${this.url}/medicines/search`, formData);
  }

  addpatient(data: any) {
    const formData = new FormData();
    formData.append('apikey', this.apikey);
    formData.append('mobile', data.mobile);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('zipcode', data.zipcode);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);
    formData.append('blood_group', data.dob.blood_group);

    return this.http.post(`${this.url}/patients/add`, formData); 
  }

  getPatient(data: any) {
    const formData = new FormData();
    formData.append('apikey', this.apikey);
    formData.append('patient_id', data);

    return this.http.post(`${this.url}/patients/view`, formData); 
  }

  checkOut(data: any) {
    const formData = new FormData();
    formData.append('apikey', this.apikey);
    formData.append('items', data.items);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);
    formData.append('distance', data.distance);

    return this.http.post(`${this.url}/orders/checkout`, formData); 
  } 

}

