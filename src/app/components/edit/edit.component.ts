import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseViewModel } from 'src/app/models/response-view-model';
import { Student } from 'src/app/models/student';
import { Patterns } from 'src/app/patterns/patterns';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string = '';
  student = new Student();
  editForm: FormGroup

  constructor(private _http: HttpClient, private _activatedRouter: ActivatedRoute, private _formBulider: FormBuilder) { }

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

    this.editForm = this._formBulider.group({
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(Patterns.NoNumber)]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(Patterns.NoNumber)]],
      Mobile: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(Patterns.Mobile)]],
      Email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern(Patterns.Email)]],
      Age: ['', [Validators.required, Validators.min(15), Validators.max(50)]],
      NationalID: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(Patterns.NationalID)]]
    });
  }

  edit(): void {
    this.student.NameArabic = "None";
    this.student.NameEnglish = "None";
    this.student.Name = this.student.FirstName + ' ' + this.student.LastName;
    this._http.put<ResponseViewModel>('https://api.mohamed-sadek.com/Student/PUT', this.student)
      .subscribe(
        respone => {
          alert(respone.Message);
        }
      );
  }


  editFirstName(): void {
    let name = this.student.Name.split(" ");
    this.student.FirstName = name[0];
    this.student.LastName = name[1];
  }
}
