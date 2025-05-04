import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RedditEntry } from '../../models/reddit.interface';

@Component({
  selector: 'app-reddit-entry-card',
  imports: [DatePipe, MatCardModule, MatIconModule],
  templateUrl: './reddit-entry-card.component.html',
  styleUrl: './reddit-entry-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditEntryCardComponent {
  @Input() redditEntry!: RedditEntry;
  @Input() isDetails: boolean = false;

  public handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
}
