import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../structures/comment'
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent implements OnInit {

  @Input() comment: Comment;
  
  isEditing = false;
  constructor() {}

  ngOnInit() {}

  replyClick() {
    this.isEditing = !this.isEditing;
  }

  onAdd($event) {
    const comment: Comment = {
      text: $event,
      username: 'Kevin',
      votes: 0,
      date: '1 min ago'
    }
    if(!this.comment.comments) {
      this.comment.comments = [];
    } 
    this.comment.comments.unshift(comment);
     this.isEditing = false;
  }

}
