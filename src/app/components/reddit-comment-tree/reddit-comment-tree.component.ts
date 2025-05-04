import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RedditComment } from '../../models/reddit.interface';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-reddit-comment-tree',
  imports: [MatCardModule, TimeAgoPipe],
  templateUrl: './reddit-comment-tree.component.html',
  styleUrl: './reddit-comment-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RedditCommentTreeComponent {
  @Input()
  public comments: RedditComment[] = [];
}
