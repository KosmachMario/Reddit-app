import { RedditChild, RedditEntry } from '../models/reddit.interface';

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
}
