import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss']
})
export class PlacesAutocompleteComponent implements OnInit {
  @Input() address: string;
  @Output() addressChanged: EventEmitter<any>;

  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.addressChanged = new EventEmitter<any>();
  }

  ngOnInit() {
    this.searchElementRef.nativeElement.value = this.address || '';

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // this.address.search = this.searchElementRef.nativeElement.value;
          // place.address_components.forEach((address_component, index) => {
          //   console.log(address_component);
          //   if (address_component.types.includes('locality'))
          //     // this.addressForm.setValue({ city: address_component.long_name });
          //     this.address.city = address_component.long_name;
          //   else if (
          //     address_component.types.includes('administrative_area_level_1')
          //   )
          //     // this.addressForm.setValue({ state: address_component.long_name });
          //     this.address.state = address_component.long_name;
          //   else if (address_component.types.includes('country'))
          //     // this.addressForm.setValue({
          //     //   country: address_component.long_name
          //     // });
          //     this.address.country = address_component.long_name;
          // });
          this.addressChanged.emit(place);
        });
      });
    });
  }
}
