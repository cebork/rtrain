import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'rtrain-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

  items: MenuItem[] | undefined;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof RoutesRecognized) {
        console.log(event);
      }
    });
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Administracja przewoźnika',
        items: [
          {
            label: 'Zarządzanie pociągami',
            icon: 'fas fa-train',
            command: () => this.navigate("/admin/trains")
          }
        ]
      },
      {
        label: 'Administracja stacji',
        items: [
          {
            label: 'Zarządzanie stacjami',
            icon: 'fas fa-random',
            command: () => this.navigate("/admin/stations")
          }
        ]
      },
      {
        label: 'Administracja',
        items: [
          {
            label: 'Zarządzanie użytkownikami',
            icon: 'fas fa-people-group',
            command: () => this.navigate("/admin/users")
          },
          {
            label: 'Zarządzanie przewoźnikami',
            icon: 'fas fa-arrow-right-arrow-left',
            command: () => this.navigate("/admin/transport-companies")
          }
        ]
      }
    ];
  }


  navigate(route: string){
    this.router.navigate([route]);
  }
}
