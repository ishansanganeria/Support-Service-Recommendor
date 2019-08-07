import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/operator/map'
import { stats } from '../assets/data_structure'
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class GetAverageService {

  constructor(private http: HttpClient) { }
  data : stats;

  // createUIDAI2(uid: number, data: Basic_Info_2): Promise<Fabric_Response> {
  //   let datastring = JSON.stringify(data)
  //   let uidString = uid.toString();
  //   return new Promise((resolve, reject) => {
  //     this.http.get<any>('http://localhost:8000/api/uidai/part2/' + uid + "/" + datastring)
  //       .subscribe((data: Fabric_Response) => {
  //         resolve(data)
  //       })
  //   });
  // }


  getAverage(): Promise<stats> {
    return new Promise((resolve,reject) => {
      this.http.get<any>("http://localhost:8080/getStatus/12345")
        .subscribe((res : stats) => {
          resolve(res);
        })
    })
  }
}
