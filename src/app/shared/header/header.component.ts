import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireStoreService } from 'src/app/Services/fire-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router, private fireService: FireStoreService) {}


  ngOnInit(): void {
    
  }

  logOut() {
    this.fireService.logOut();
    this.router.navigate(['/login'])
  }

}
