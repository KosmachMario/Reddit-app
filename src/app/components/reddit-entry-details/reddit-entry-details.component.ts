import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, map, Observable, of, take } from 'rxjs';
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
  public comments = signal<RedditComment[]>([]);

  private entry$ = this.getEntry().pipe(
    take(1),
    finalize(() => this.loading.set(false))
  );

  public redditEntry = toSignal(this.entry$, {
    initialValue: null as RedditEntry | null,
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly redditService: RedditService,
    private readonly location: Location
  ) {}

  public goBack(): void {
    this.location.back();
  }

  private getEntry(): Observable<RedditEntry | null> {
    if (!this.entryId) {
      return of(null);
    }

    return this.redditService.getEntryById(this.entryId).pipe(
      map(([entryResponse, commentsResponse]) => {
        const commentsData = commentsResponse.data
          .children as unknown as RedditChild<RedditCommentInput>[];
        this.comments.set(RedditMapper.parseComments(commentsData));

        const data = entryResponse.data.children[0];
        return RedditMapper.transformEntries([data])[0];
      })
    );
  }
}
