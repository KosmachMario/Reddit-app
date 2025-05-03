import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RedditService } from '../../services/reddit.service';
import { RedditEntryCardComponent } from '../reddit-entry-card/reddit-entry-card.component';

@Component({
  selector: 'app-reddit-feed',
  imports: [
    AsyncPipe,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    RedditEntryCardComponent,
  ],
  templateUrl: './reddit-feed.component.html',
  styleUrl: './reddit-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditFeedComponent {
  public entries$ = this.redditService.currentEntries$;
  public loading$ = this.redditService.loading$;
  public subreddit$ = this.redditService.currentSubreddit$;

  constructor(public redditService: RedditService) {}
}
