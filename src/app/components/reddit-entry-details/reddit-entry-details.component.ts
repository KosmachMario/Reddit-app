import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, map, take } from 'rxjs';
import { RedditEntry } from '../../models/reddit.interface';
import { RedditEntryCardComponent } from '../reddit-entry-card/reddit-entry-card.component';
import { RedditService } from '../../services/reddit.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-entry-details',
  imports: [
    MatProgressBarModule,
    RedditEntryCardComponent,
    EmptyStateComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './reddit-entry-details.component.html',
  styleUrl: './reddit-entry-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditEntryDetailsComponent implements OnInit {
  public redditEntry = signal<RedditEntry | null>(null);
  public loading = signal<boolean>(true);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly redditService: RedditService,
    private readonly location: Location
  ) {}

  public ngOnInit(): void {
    const entryId = this.route.snapshot.paramMap.get('id');

    this.redditService.currentEntries$
      .pipe(
        map((entries) => {
          const entry = entries.find((entry) => entry.id === entryId);
          if (entry) {
            return entry;
          }

          return null;
        }),
        take(1),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe((entry) => {
        this.redditEntry.set(entry);
      });
  }

  public goBack(): void {
    this.location.back();
  }
}
