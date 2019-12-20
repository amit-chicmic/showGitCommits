import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { APIS } from '../common/constants';
import { LoaderService } from '../services/loader.service';
@Component({
  selector: 'app-commit-list',
  templateUrl: './commit-list.component.html',
  styleUrls: ['./commit-list.component.css']
})
export class CommitListComponent implements OnInit {
  commits: any;
  title: string;
  paginationData: any = [];
  match = ['"first"', '"next"', '"prev"', '"last"'];
  first: boolean;
  next: boolean;
  prev: boolean;
  last: boolean;
  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private loader: LoaderService

  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((res: any) => {
      this.title = res.title;
    })
    this.getData(APIS.GETALLCOMMITS);
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

  strExist(substr) {
    switch (substr) {
      case this.match[0]:
        this.first = this.test(substr);
        break;
      case this.match[1]:
        this.next = this.test(substr);
        break;
      case this.match[2]:
        this.prev = this.test(substr);
        break
      case this.match[3]:
        this.last = this.test(substr);
        break

    }
  }
  test(substr) {
    const text = this.paginationData.find(element => {
      return element.rel.includes(substr);
    })
    return text ? true : false;
  }

  getData(api) {
    this.paginationData = [];
    this.first = this.next = this.prev = this.last = false;
    this.loader.show();
    this.httpClient.get(api, { observe: 'response' }).subscribe((res: any) => {
      this.loader.hide();
      res.headers.lazyInit();
      const paginationString = res.headers.headers.get('link')[0].split(',');
      paginationString.forEach(str => {
        this.paginationData.push({ url: str.split(';')[0], rel: str.split(';')[1].split('=')[1] });
      })
      this.paginationData.forEach(obj => {
        this.strExist(obj.rel);
      })
      this.commits = res.body;
    }, err => {
      this.loader.hide()
    })
  }

  getCommits(str) {
    const obj = this.paginationData.find(element => {
      return element.rel.includes(str);
    })

    const api = obj.url.substring(obj.url.lastIndexOf("<") + 1, obj.url.lastIndexOf(">"));
    this.getData(api);
  }

}
