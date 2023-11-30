import { Component } from '@angular/core';

@Component({
  selector: 'rtrain-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  items: any[] = []

  ngOnInit() {
    this.items = [
      { label: 'Rozkłady jazdy', icon: 'pi pi-fw pi-palette', description: 'W tym module na podstawie otrzymanych inforamcji od przewoźnika będziesz mógł utworzyć rozkłady jazdy dla wybranej linii' },
      { label: 'Wykresy ruchu', icon: 'pi pi-fw pi-chart-line', description: 'Wykresy ruchu są przedstawieniem odpowiedniej trasy pociągu dla wybranej linii. Widoczne są tutaj także zamknięcia, opóźnienia oraz wiele wiecej'  },
      { label: 'Incydenty', icon: 'i pi-fw fa-solid fa-bolt', description: 'W tym miejscu możesz przypisać odpowiednie zdarzenia, które miały miejsce na wskazanej linii' },
      { label: 'Stacja', icon: 'pi pi-fw fa-solid fa-warehouse', description: 'Tutaj dyżurni ruchu mają możliwość wprowadzenia niezbędnych danych odnoścnie punktualności pociągów' },
    ];

  }
}
