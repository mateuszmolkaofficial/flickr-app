import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Post } from '../interfaces/post';

import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit, OnDestroy {
  private postsObservable: Observable<Array<Post>>;
  private posts: Array<Post>;
  private indexParamSubscribtion: Subscription;
  private subscription: Subscription;
  private postIndex: number;

  private post: Post;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,
    private router: Router
  ) {
    this.postsObservable = postService.posts;
  }

  ngOnInit() {
    this.indexParamSubscribtion = this.route.params.subscribe((params: Params) => {
      this.postIndex = params['index'];
    });

    this.subscription = this.postsObservable
      .subscribe( posts => {
        this.posts = posts;
      });

    if (this.posts.length === 0) {
      this.router.navigate(['post']);
    }
   
    this.post = this.posts[this.postIndex];
  }

  ngOnDestroy() {
    this.indexParamSubscribtion.unsubscribe();
    this.subscription.unsubscribe();
  }

}
