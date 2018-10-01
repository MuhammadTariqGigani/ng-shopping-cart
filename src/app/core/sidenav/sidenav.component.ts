import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  loadingDialogRef: MatDialogRef<LoadingComponent>;
  loadingSubscription: Subscription;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.getUser();
    this.loadingSubscription = this.auth.isLoading$.subscribe(isLoading => {
      if (isLoading) {
        this.loadingDialogRef = this.dialog.open(LoadingComponent);
      } else {
        if (this.loadingDialogRef) {
          this.loadingDialogRef.close();
        }
      }
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  onLogin() {
    this.auth.signIn();
  }

  onLogOut() {
    this.auth.signOut();
  }

  onClickOrder() {
    this.router.navigate(['order']);
  }
}
