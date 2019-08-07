import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  nodeCall() {
    this.http.get<any>("http://localhost:8080/sendSMS")
      .subscribe(() => {
        this.http.get<any>("http://localhost:8080/pushNotification")
          .subscribe()
      })
  }
}
