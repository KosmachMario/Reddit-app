import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { map } from 'rxjs';
import { RedditService } from '../../services/reddit.service';
import { RedditEntryCardComponent } from '../reddit-entry-card/reddit-entry-card.component';
import { RedditEntry } from '../../models/reddit.interface';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

@Component({
  selector: 'app-reddit-feed',
  imports: [
    AsyncPipe,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    RedditEntryCardComponent,
    MatButtonModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    EmptyStateComponent,
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

  constructor(
    private readonly redditService: RedditService,
    private readonly router: Router
  ) {}

  public nextPage(): void {
    this.redditService.goToNextPage();
  }

  public previousPage(): void {
    this.redditService.goToPreviousPage();
  }

  public changeSubreddit(subreddit: string): void {
    this.redditService.setSubreddit(subreddit);
  }

  public changeEntriesPerPage(count: number): void {
    this.redditService.setEntriesPerPage(count);
  }

  public viewEntry(entry: RedditEntry): void {
    this.router.navigate(['/entry', entry.id]);
  }
}
