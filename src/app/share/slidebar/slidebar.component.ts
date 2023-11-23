import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../../services/user.service';
import { Application } from '../../services/application.service'

declare let $: any;

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit, AfterViewInit {

  public user: User=<User>{};
  public fullName: string='';
  public jobType: number=1;

  public application: Application = <Application>{};

  constructor() {
    let struser = localStorage.getItem('user');

    if(struser) {
      this.user = JSON.parse(struser) as User;
      this.fullName = this.user.firstname + ' ' + this.user.lastname;

    } else {
      this.fullName='';
    }
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    $('#nav-menu li a').click(function(this:any) {
        $('#nav-menu li a').removeClass('active');
        $(this).addClass('active');
    });

  }

  changeJobType() {
    this.application.currentIssueType = this.jobType;

    localStorage.setItem('application', JSON.stringify(this.application))
  }
}
