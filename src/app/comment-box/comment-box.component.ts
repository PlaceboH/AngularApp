import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html'
})
export class CommentBoxComponent implements OnInit {
  @Output() add = new EventEmitter<string>();
  value: string;
  constructor() {}

  ngOnInit() {}

  post() {
    if (this.value.trim()) {
      this.add.emit(this.value);
      this.value = '';
    }
  }

}
