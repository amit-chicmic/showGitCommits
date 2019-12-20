import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { APIS } from '../common/constants';
@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.css']
})
export class CommitListComponent implements OnInit {
  commits: any;
  title: string;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((res: any) => {
      this.title = res.title;
    })
    this.httpService.getData(APIS.GETALLCOMMITS).subscribe(res => {
      this.commits = res;
    })
  }
  getDate(str) {
    return moment(str).format('DD MMM, YYYY')
  }

}
