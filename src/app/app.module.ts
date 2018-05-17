import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlacesAutocompleteComponent } from './places-autocomplete/places-autocomplete.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [AppComponent, PlacesAutocompleteComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCvx3nJx_sh8miTnIHofk23FfoT86SgHak',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
