import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'as-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  ngOnInit() {
    this.setupClickForHover();
  }

  private setupClickForHover() {
    $('.nav .menu-dropdown .menu-button').hover(
      function() { $(this).click(); },
      function() { /* do nothing */ }
    );
  }

}
