import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ResponseViewModel } from 'src/app/models/response-view-model';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {


  constructor(private _http: HttpClient) { }

  add(firstName: string, lastName: string, mobile: string, email: string, nationalID: string, age: number): void {
    let student = new Student(firstName, lastName, mobile, email, nationalID, age);
    this._http.post<ResponseViewModel>('https://api.mohamed-sadek.com/Student/POST',student)
      .subscribe(
        respone => {
          alert(respone.Message);
        },
      );
  }
}
