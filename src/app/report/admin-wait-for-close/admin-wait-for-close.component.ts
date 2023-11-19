import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Issue, IssueService } from 'src/app/services/issue.service';
import { Router } from '@angular/router';

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare let $:any;

@Component({
  selector: 'app-admin-wait-for-close',
  templateUrl: './admin-wait-for-close.component.html',
  styleUrls: ['./admin-wait-for-close.component.css']
})
export class AdminWaitForCloseComponent implements OnInit, AfterViewInit {

    public dataTable: DataTable = <DataTable>{};
    public data: string[][] = [];

    public issues: Issue[] = [];
    public issue: Issue = <Issue>{};

    constructor(
      private readonly _issueServ: IssueService,
      private readonly _router: Router) { 

      this.dataTable = {
        headerRow: ['วันที่', 'เลขที่รับเรื่อง', 'ประเภทงาน', 'อุปกรณ์', 'ชื่อผู้แจ้ง', 'โทรศัพท์ติดต่อ' ],
        footerRow: ['วันที่', 'เลขที่รับเรื่อง', 'ประเภทงาน', 'อุปกรณ์', 'ชื่อผู้แจ้ง', 'โทรศัพท์ติดต่อ' ],
        dataRows: [],
      };
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
      this.initTable();
      this.search();
    }

    initTable() {
      let self = this;

      let table = $('#admin-proceeding-table').DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'print'],
        columnDefs: [
          { target: [0, 1], width: '10em', className: 'text-center' },
          { target: [2, 3, 5], width: '15em' },
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Search records",
        },
        paging: true,
        pageLength: 15,
        pagingType: "full_numbers",
      });

      table.on('mouseover', 'tr', function(this: any) {
        $(this).css('cursor', 'pointer');
        $(this).css('font-weight', 'bold');
      });

      table.on('mouseout', 'tr', function(this: any) {
        $(this).css('font-weight', 'normal');
      });

      table.on('click', 'td', function(this: any) {
        let $tr = $(this).closest('tr');
        self.issue = self.issues[table.row($tr).index()];
        self._router.navigate(['admin/edit-issue', { id: self.issue.id }]);
      });
    }

    refreshTable() {
      let table = $('#admin-proceeding-table').DataTable();
      table.clear();
      this.data = [];

      if(this.issues) {
        this.issues.forEach(s => {
          var created = new Date(String(s.created));

          this.data.push([
            created.toLocaleDateString(),
            s.code,
            s.equipment?.group == undefined ? '' : s.equipment.group.name,
            s.equipment == undefined ? '' : s.equipment.name,
            s.caller,
            s.phoneno,
          ]);
        });
      }

      table.rows.add(this.data);
      table.draw();
    }

    search() {
      this._issueServ.findWaitForClose().subscribe(s => {
        this.issues = s;
        this.refreshTable();
      });
    }

    insert() {
//      this.dept = <Department>{};
//      this.dept.id = 0;
//
//      $('#department-modal').modal('show');
    }

    save() {
//      this.deptServ.save(this.dept).subscribe(s => {
//        if(s) {
//          this.search();
//          this.close();
//        }
//      });
    }

    close() {
      $('#issue-modal').modal('hide');
    }
}
