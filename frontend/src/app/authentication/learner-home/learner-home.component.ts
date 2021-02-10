import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-investor-home',
  templateUrl: './learner-home.component.html',
  styleUrls: ['./learner-home.component.css']
})
export class LearnerHomeComponent implements OnInit {
  myData: any;
  investorCount: any;
  investors: any;

  constructor(
    private dataService: DataService,
    public toastr: ToastrService) { }

  ngOnInit() {
    this.getLearnerHomeData();
  }

  getLearnerHomeData() {
      this.dataService.getLearnerHomeData().subscribe(
        (res: any) => {
          if (res.status === true) {
            this.myData = res.data.user;
            this.investorCount = res.data.invester_count;
            this.investors = res.data.investers;
          } else {
            // this.router.navigate(['learner-home']);
            // this.toastr.error(res.message);
          }
        },
        err => {
          this.toastr.error(err.message);
        });
    }

}
