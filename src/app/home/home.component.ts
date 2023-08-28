import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button (click)="filterResults(filter.value)" class="primary" type="button">Search</button>
    </form>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  </section>
`,
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList: HousingLocation[] = [];

  filteredLocationList: HousingLocation[] = [];

  housingSevice: HousingService = inject(HousingService);

  filterResults(filter: string) {
    this.filteredLocationList = this.housingSevice.filterHousingLocations(filter);
  }


  constructor() {
    this.housingSevice.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList.map(house => {
        house.photo = `${this.baseUrl}/${house.photo.split('/').pop()}`;
        return house;
      });
      this.filteredLocationList = housingLocationList;
    });
  }

}

