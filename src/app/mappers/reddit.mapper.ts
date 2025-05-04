import {
  RedditChild,
  RedditComment,
  RedditCommentInput,
  RedditEntry,
} from '../models/reddit.interface';

export class RedditMapper {
  static transformEntries(children: RedditChild[]): RedditEntry[] {
    return children.map((child) => {
      const data = child.data;
      return {
        id: data.id,
        title: data.title,
        author: data.author,
        created: new Date(data.created_utc * 1000),
        thumbnail: data.thumbnail?.startsWith('http') ? data.thumbnail : null,
        score: data.score,
        numComments: data.num_comments,
        permalink: data.permalink,
        selftext: data.selftext,
        url: data.url,
      };
    });
  }

  static parseComments(
    comments: RedditChild<RedditCommentInput>[]
  ): RedditComment[] {
    if (!comments || comments.length === 0) return [];

    return comments
      .filter((comment) => comment.kind === 't1')
      .map((comment) => {
        const data: RedditCommentInput = comment.data;
        const replies =
          data.replies && data.replies.data
            ? RedditMapper.parseComments(data.replies.data.children)
            : [];

        return {
          id: data.id,
          author: data.author,
          body: data.body,
          score: data.score,
          created: new Date(data.created_utc * 1000),
          replies: replies,
          collapsed: true,
        };
      });
  }
}
