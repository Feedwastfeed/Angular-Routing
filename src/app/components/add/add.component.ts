import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseViewModel } from 'src/app/models/response-view-model';
import { Student } from 'src/app/models/student';
import { Patterns } from 'src/app/patterns/patterns';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  addForm: FormGroup
  
  constructor(private _http: HttpClient, private _formBulider: FormBuilder) { }

  ngOnInit(): void {
    this.addForm = this._formBulider.group({
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(Patterns.NoNumber)]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(Patterns.NoNumber)]],
      Mobile: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(Patterns.Mobile)]],
      Email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern(Patterns.Email)]],
      Age: ['', [Validators.required, Validators.min(15), Validators.max(50)]],
      NationalID: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern(Patterns.NationalID)]]
    });
  }

  add(): void {
    
    let student = this.addForm.value as Student;
    this._http.post<ResponseViewModel>('https://api.mohamed-sadek.com/Student/POST', student)
      .subscribe(
        respone => {
          alert(respone.Message);
        },
      );
  }
}
