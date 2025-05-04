import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RedditService } from '../../services/reddit.service';
import { RedditEntryCardComponent } from '../reddit-entry-card/reddit-entry-card.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-reddit-feed',
  imports: [
    AsyncPipe,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    RedditEntryCardComponent,
    MatButtonModule,
  ],
  templateUrl: './reddit-feed.component.html',
  styleUrl: './reddit-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditFeedComponent {
  public entries$ = this.redditService.currentEntries$;
  public loading$ = this.redditService.loading$;
  public subreddit$ = this.redditService.currentSubreddit$;

  public entriesPerPage$ = this.redditService.entriesPerPage$;
  public hasNextPage$ = this.redditService.currentAfter$;
  public hasPreviousPage$ = this.redditService.beforeHistory$.pipe(
    map((list) => Boolean(list.length))
  );

  constructor(public redditService: RedditService) {}

  public nextPage(): void {
    this.redditService.goToNextPage();
  }

  public previousPage(): void {
    this.redditService.goToPreviousPage();
  }
}
