import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  private medicineName = new BehaviorSubject<any>(null);
  public medicineName$ = this.medicineName.asObservable();

  sendMedicineName(data: any): void {
    this.medicineName.next(data);
  }

  private medicineId = new BehaviorSubject<any>(null);
  public medicineId$ = this.medicineId.asObservable();

  sendmedicineId(data: any): void {
    this.medicineId.next(data);
  }

  private orderCount = new BehaviorSubject<any>(null);
  public orderCount$ = this.orderCount.asObservable();

  sendOrderCount(data: any): void {
    this.orderCount.next(data);
  }

  private gridData = new BehaviorSubject<any>(null);
  public gridData$ = this.gridData.asObservable();

  sendgridData(data: any): void {
    this.gridData.next(data);
  }

  private orderPlaced = new BehaviorSubject<any>(null);
  public orderPlaced$ = this.orderPlaced.asObservable();

  sendOrderPlaced(data: any): void {
    this.orderPlaced.next(data);
  }


}
