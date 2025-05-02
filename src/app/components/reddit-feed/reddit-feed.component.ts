import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reddit-feed',
  imports: [],
  templateUrl: './reddit-feed.component.html',
  styleUrl: './reddit-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditFeedComponent {}
