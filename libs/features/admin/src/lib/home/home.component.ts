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
        label: 'Administracja architektury',
        items: [
          {
            label: 'Zarządzanie stacjami',
            icon: 'fas fa-random',
            command: () => this.navigate("/admin/stations")
          },
          {
            label: 'Zarządzanie liniami',
            icon: 'fas fa-grip-lines',
            command: () => this.navigate("/admin/lines")
          },
          {
            label: 'Zarządzanie zakładami',
            icon: 'fa-solid fa-building',
            command: () => this.navigate("/admin/firms")
          },
          {
            label: 'Zarządzanie połączeniami',
            icon: 'fa-brands fa-connectdevelop',
            command: () => this.navigate("/admin/connections")
          }
        ],
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
          },
          {
            label: 'Zarządzanie typami pociągów',
            icon: 'fa-brands fa-squarespace',
            command: () => this.navigate("/admin/train-types")
          }
        ]
      },
      {
        label: 'Administracja incydentami',
        items: [
          {
            label: 'Zarządzanie kodami incydentów',
            icon: 'fa fa-book',
            command: () => this.navigate("/admin/incident-codes")
          }
        ]
      }
    ];
  }


  navigate(route: string){
    this.router.navigate([route]);
  }
}
