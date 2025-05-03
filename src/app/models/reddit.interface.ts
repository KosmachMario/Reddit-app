export interface RedditResponse {
  kind: string;
  data: {
    after: string | null;
    before: string | null;
    children: RedditChild[];
    dist: number;
    modhash: string;
  };
}

export interface RedditChild {
  kind: string;
  data: RedditEntryInput;
}

export interface RedditEntry {
  id: string;
  title: string;
  author: string;
  created: Date;
  thumbnail: string | null;
  score: number;
  numComments: number;
  permalink: string;
  selftext: string;
  url: string;
}

export type RedditEntryInput = Omit<RedditEntry, 'created' | 'numComments'> & {
  created_utc: number;
  num_comments: number;
};
