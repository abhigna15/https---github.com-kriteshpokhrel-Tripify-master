import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomepageComponent } from '../homepage/homepage.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private router: Router
  ) { }
 
  isLoggedin(): boolean{
    if(localStorage.getItem("access_token") && this.currentUser !=null){
      return true;
    }
    return false;
  }

  ngOnInit(): void {
  }

  onClick(path: string) {
    this.router.navigate([path]);
  }
  logout(){
    localStorage.removeItem("access_token");
    this.router.navigateByUrl('login');
  }
}
