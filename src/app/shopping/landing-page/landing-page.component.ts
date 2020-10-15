import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public list = [];
  public type = '';
  public options = ['Home', 'Chess', 'Soccer', 'Watersports'];
  public selected = 0


  constructor(public gs: GlobalService) { }

  ngOnInit(): void {
    this.list = this.gs.items
    this.setPagination()
  
  }

  filter(type, i) {
    if (type == 'Home') {
      this.list = this.gs.items;
    } else {
      this.list = this.gs.items.filter(item => {
        if ((item.type).toLowerCase() === type.toLowerCase()) {
          return item
        }
      })
    }
    this.selected = i;
    this.activePage = 1
    this.setPagination()
  }


  public pages: number;
  public activePage: number = 1;
  public perPage = 5;
  setPagination() {
    let pages = this.list.length / this.perPage;
    let l = parseInt(pages.toString());
    this.pages = l >= pages ? l : l + 1;
  }

  setActivePage(page) {
    this.activePage = page
  }

  navigate(id) {
    this.gs.navigate('store/' + id)
  }

}
