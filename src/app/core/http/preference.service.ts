import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HarProperty, NewListing, PrefAccess, PrefBlockDate, PrefContacts, PreferenceAccess, PreferenceBlockDate, PreferenceContacts, Property, PropertyAdvanceSearchRequest, PropertyPreference, PropertyPreferenceEntity, PropertyPreferenceReq } from '@core/models/listing';
import { buildHttpParams } from '@core/helpers';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigBeforeNotice } from '@core/models/listing/config-before-notice';
import { ConfigShowingDuration } from '@core/models/listing/config-showing-duration';
import { ReplaySubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ShowingInstruction } from '@core/models/listing/showing-instruction';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) {}

  private newlistingSubject = new Subject<boolean>();
  private accessSubject = new Subject<boolean>();
  private blockDateSubject = new Subject<boolean>();
  private contactsSubject = new Subject<boolean>();

  /*
    form values are access, block and contacts
  */
  deletePreference(id: number, form: string) {
    const params = {
      form: form
    }
    return this.http.delete(`${env.apiUrl}/listing/deletion/preference/`+ id, {
      params: buildHttpParams(params)
    }).pipe(
      map((res) => {
        if(res['form'] == 'access') {
          this.accessSubject.next(true);
        } else if (res['form'] == 'block') {
          this.blockDateSubject.next(true);
        } else if (res['form'] == 'contacts') {
          this.contactsSubject.next(true);
        }
        return res;
      })
    )  as Observable<any>
	}

  deleteSubPreference(mlsNumber: string, state: string) {
    const params = {
      state: state
    }
    return this.http.delete(`${env.apiUrl}/listing/cancel/preference/`+ mlsNumber, {
      params: buildHttpParams(params)
    })  as Observable<any>
	}

  disablePreference(mlsNumber: string): Observable<any> {
    return this.http.put(`${env.apiUrl}/listing/preference/disabled/` + mlsNumber, null)as Observable<any>;
  }

  getAccessUpdates$(): Observable<boolean> {
    return this.accessSubject.asObservable();
  }

  getBlockDateUpdates$(): Observable<boolean> {
    return this.blockDateSubject.asObservable();
  }

  getContactsUpdates$(): Observable<boolean> {
    return this.contactsSubject.asObservable();
  }

  getb4NoticeList(): Observable<ConfigBeforeNotice[]> {
    return this.http.get(`${env.apiUrl}/listing/preference/before/notice`) as Observable<ConfigBeforeNotice[]>
  }

  getListByMemberMlsId(mlsNumber: string) : Observable<PropertyPreferenceEntity> {
    return this.http.get(`${env.apiUrl}/listing/preference/property/` + mlsNumber) as Observable<PropertyPreferenceEntity>
  }



  

  getListAccessByMlsNumber(mlsNumber: string) : Observable<PreferenceAccess []> {
    return this.http.get(`${env.apiUrl}/listing/preference/access/` + mlsNumber) as Observable<PreferenceAccess []>
  }

  getListBlockByMlsNumber(mlsNumber: string) : Observable<PreferenceBlockDate []> {
    return this.http.get(`${env.apiUrl}/listing/preference/block/` + mlsNumber) as Observable<PreferenceBlockDate []>
  }

  getListContactByMlsNumber(mlsNumber: string) : Observable<PreferenceContacts []> {
    return this.http.get(`${env.apiUrl}/listing/preference/contacts/` + mlsNumber) as Observable<PreferenceContacts []>
  }

  getNewListing(): Observable<NewListing> {
    return this.http.get(`${env.apiUrl}/listing/property/listing`) as Observable<NewListing>
  }

  getNewListingUpdates$(): Observable<boolean> {
    return this.newlistingSubject.asObservable();
  }

  getShowingInstruction(mlsNumber: string): Observable<ShowingInstruction> {
    return this.http.get(`${env.apiUrl}/listing/property/showing/instructions/`  + mlsNumber) as Observable<ShowingInstruction>
  }

  getShowingDurationList(): Observable<ConfigShowingDuration[]> {
    return this.http.get(`${env.apiUrl}/listing/preference/showing/duration`) as Observable<ConfigShowingDuration[]>
  }

  savePreference(request: PropertyPreferenceReq) {
    return this.http.post(`${env.apiUrl}/listing/preference`, request ) as Observable<PropertyPreference>;
	}

  saveAccessPreference(request: PrefAccess) {
    return this.http.post(`${env.apiUrl}/listing/preference/access`, request ).pipe(
      map((res) => {
        this.accessSubject.next(true);
        return res;
      })
    ) as Observable<PreferenceAccess>
	}

  saveBlockPreference(request: PrefBlockDate) {
    return this.http.post(`${env.apiUrl}/listing/preference/block`, request ).pipe(
      map((res) => {
        this.blockDateSubject.next(true);
        return res;
      })
    ) as Observable<PreferenceBlockDate>
	}

  saveContactPreference(request: PrefContacts) {
    return this.http.post(`${env.apiUrl}/listing/preference/contacts`, request ).pipe(
      map((res) => {
        this.contactsSubject.next(true);
        return res;
      })
    ) as Observable<PreferenceContacts>
	}

  searchAdvance(searchRequest: PropertyAdvanceSearchRequest, filter: string): Observable<HarProperty[]> {
    return this.http.post(`${env.apiUrl}/listing/property/searchAdvanced?filter=`+ filter, searchRequest ) as Observable<HarProperty[]>
  }

}
