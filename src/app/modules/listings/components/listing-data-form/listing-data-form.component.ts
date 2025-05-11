import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormView } from '@core/models/form';
import { HarProperty, Property, PropertyMedia } from '@core/models/listing';
import { LoginData } from '@core/models/session';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-listing-data-form',
  templateUrl: './listing-data-form.component.html',
  styleUrls: ['./listing-data-form.component.scss']
})
export class ListingDataFormComponent implements OnInit {

  @Input() listing: Property;
  @Input() loginData: LoginData;
  @Input() formGroupValue: FormGroup;
  @Input() view: FormView;

    faCoffee = faCoffee;


  address: String;
  medias: PropertyMedia[];
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 3
    }
];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listing && this.listing) {
      this.medias = this.listing.propertyMedia;
      // this.address = this.listing.unitNumber + " " + this.listing.streetNumber + " " + this.listing.streetName + ", " +
      //   this.listing.county + ", " + this.listing.state + " " +  this.listing.stateCode + " " + this.listing.postalCode;
    }
  }
}
