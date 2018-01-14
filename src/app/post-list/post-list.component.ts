import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post'
import { PostService } from '../services/post.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  postsObservable: Observable<Array<Post>>;
  posts: Array<Post>;
  
  private subscription: Subscription;
  private timer;

  constructor(private postService: PostService) {
    this.postsObservable = postService.posts;
  }

  ngOnInit() {
    this.subscription = this.postsObservable
      .subscribe( posts => {
        this.posts = posts;
      })
      
    if (this.posts.length === 0) {
      this.postService.loadPosts()
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchFunction($event) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.postService.loadPosts($event)
    }, 750)
  }
}
