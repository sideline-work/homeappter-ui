import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HarProperty, NewListing, Property, PropertyAdvanceSearchRequest } from '@core/models/listing';
import { buildHttpParams } from '@core/helpers';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) {}

  getListing(listingId?: any): Observable<Property> {
    return this.http.get(`${env.apiUrl}/listing/property/` + listingId) as Observable<Property>
  }

  getListings(): Observable<HarProperty[]> {
    return this.http.get(`${env.apiUrl}/listing/properties`) as Observable<HarProperty[]>
  }

  saveNewListing(listing: HarProperty): Observable<any> {
    return this.http.post(`${env.apiUrl}/listing/property/saveNew`, listing ) as Observable<any>
  }

  search(keyword: string, filter: string): Observable<HarProperty[]> {
    const params= {
      keywords: keyword,
      filter: filter
    };
    return this.http.get(`${env.apiUrl}/listing/property/search`, {
      params: buildHttpParams(params)
    }) as Observable<HarProperty[]>
  }

  searchAdvance(searchRequest: PropertyAdvanceSearchRequest, filter: string): Observable<HarProperty[]> {
    return this.http.post(`${env.apiUrl}/listing/property/searchAdvanced?filter=`+ filter, searchRequest ) as Observable<HarProperty[]>
  }

}
