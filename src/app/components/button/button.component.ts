import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string | undefined;
  @Input() color: string | undefined;
  @Input() clicked: boolean = false;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Disables button
   */
  onClick() {
    this.clicked = true;
    this.btnClick.emit();
  }
}
