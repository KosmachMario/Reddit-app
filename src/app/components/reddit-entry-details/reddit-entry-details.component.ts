import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, map, Observable, of, switchMap, take, tap } from 'rxjs';
import {
  RedditChild,
  RedditComment,
  RedditCommentInput,
  RedditEntry,
} from '../../models/reddit.interface';
import { RedditEntryCardComponent } from '../reddit-entry-card/reddit-entry-card.component';
import { RedditService } from '../../services/reddit.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { RedditMapper } from '../../mappers/reddit.mapper';
import { RedditCommentTreeComponent } from '../reddit-comment-tree/reddit-comment-tree.component';

@Component({
  selector: 'app-entry-details',
  imports: [
    MatProgressBarModule,
    RedditEntryCardComponent,
    EmptyStateComponent,
    MatButtonModule,
    MatIconModule,
    RedditCommentTreeComponent,
  ],
  templateUrl: './reddit-entry-details.component.html',
  styleUrl: './reddit-entry-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditEntryDetailsComponent {
  private entryId = this.route.snapshot.paramMap.get('id');

  public loading = signal<boolean>(true);

  private entry$ = this.redditService.currentEntries$.pipe(
    map(
      (entries) => entries.find((entry) => entry.id === this.entryId) || null
    ),
    tap((entry) => {
      if (!entry) this.loading.set(false);
    }),
    take(1)
  );

  public redditEntry = toSignal(this.entry$, {
    initialValue: null as RedditEntry | null,
  });

  public comments = toSignal(
    this.entry$.pipe(
      switchMap((entry) => {
        if (!entry) return of([] as RedditComment[]);
        return this.getThreadedComments();
      }),
      finalize(() => this.loading.set(false))
    ),
    { initialValue: [] as RedditComment[] }
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly redditService: RedditService,
    private readonly location: Location
  ) {}

  public goBack(): void {
    this.location.back();
  }

  private getThreadedComments(): Observable<RedditComment[]> {
    if (!this.entryId) {
      return of([]);
    }

    return this.redditService.getEntryComments(this.entryId).pipe(
      map((response) => {
        const commentsData = response[1].data
          .children as unknown as RedditChild<RedditCommentInput>[];
        return RedditMapper.parseComments(commentsData);
      })
    );
  }
}
