import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResponseViewModel } from 'src/app/models/response-view-model';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  students: Student[] = [];

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get<ResponseViewModel>('https://api.mohamed-sadek.com/Student/Get')
      .subscribe(
        response => {
          this.students = response.Data;
          console.log(this.students);
        }
      );
  }

  delete(index:number):void{
    let student=this.students[index];
    this._http.delete('https://api.mohamed-sadek.com/Student/Delete?id='+student.ID)
    .subscribe(
      response=>{ 
         this.students.splice(index,1);
      }
    );
  }

}
