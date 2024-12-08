import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { DataShareService } from 'src/app/Services/data-share.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {

  orderDetails: any;
  date: any;
  total: any;
  readonly dialog = inject(MatDialog);


  constructor(private router: Router, private dataShareService: DataShareService) {

  }

  ngOnInit(): void {
    this.dataShareService.orderPlaced$.subscribe(res => {
      this.orderDetails = res.data;
      this.date = res.datetime;
    })
    this.total = localStorage.getItem("total");
  }

  returnHome() {
    this.dialog.closeAll();
    this.router.navigate(['/home']);
  }

}
