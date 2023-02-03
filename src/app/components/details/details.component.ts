import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseViewModel } from 'src/app/models/response-view-model';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
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
        }
      );
  }

}
