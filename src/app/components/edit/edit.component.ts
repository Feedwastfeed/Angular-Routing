import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseViewModel } from 'src/app/models/response-view-model';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string = '';
  student = new Student();

  constructor(private _http: HttpClient, private _activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe(
      parms => {
        this.id = parms.get('id') || '';
      }
    );

    this._http.get<ResponseViewModel>('https://api.mohamed-sadek.com/Student/GetByID?id=' + this.id)
      .subscribe(
        respone => {
          this.student = respone.Data;
          this.editFirstName();
        }
      );
  }

  edit(): void {
    this._http.put<ResponseViewModel>('https://api.mohamed-sadek.com/Student/PUT', this.student)
      .subscribe(
        respone => {
          alert(respone.Message + this.student.ID);
        },
      );
  }


  editFirstName(): void {
    let name = this.student.Name.split(" ");
    this.student.FirstName = name[0];
    this.student.LastName = name[1];
  }
}
