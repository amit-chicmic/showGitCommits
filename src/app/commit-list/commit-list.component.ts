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
    const date = new Date(str);
    const currentDate = new Date();
    if (date.getFullYear() == currentDate.getFullYear()) {
      if (date.getMonth() == currentDate.getMonth()) {
        if (date.getDate() == currentDate.getDate()) {
          if (date.getHours() == currentDate.getHours()) {
            if (date.getMinutes() == currentDate.getMinutes()) {
              return `${currentDate.getSeconds() - date.getSeconds()} seconds ago`
            } else {
              return `${currentDate.getMinutes() - date.getMinutes()} minutes ago`
            }
          } else {
            return `${currentDate.getHours() - date.getHours()} hours ago`
          }
        } else {
          return `${currentDate.getDate() - date.getDate()} days ago`
        }
      } else {
        return `${currentDate.getMonth() - date.getMonth()} months ago`
      }
    } else {
      return `${currentDate.getFullYear() - date.getFullYear()} years ago`
    }
  }

}
