import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RedditComment } from '../../models/reddit.interface';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { expandCollapseAnimation } from '../../animations/expand-collapse.animation';

@Component({
  selector: 'app-reddit-comment-tree',
  imports: [MatCardModule, TimeAgoPipe, MatIconModule, MatIconButton],
  templateUrl: './reddit-comment-tree.component.html',
  styleUrl: './reddit-comment-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [expandCollapseAnimation],
})
export class RedditCommentTreeComponent {
  @Input()
  public comments: RedditComment[] = [];

  public toggleReplies(comment: RedditComment): void {
    comment.collapsed = !comment.collapsed;
  }
}
