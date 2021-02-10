import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';
@Injectable()
export class SessionService {
  constructor(private router: Router, private userIdle: UserIdleService) {
    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe(count => {
      console.log(count);
    });

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      console.log('Time is up!');
      this.router.navigate(['logout']);
      this.restart();
    });
  }

  restart() {
    this.userIdle.resetTimer();
  }
}
