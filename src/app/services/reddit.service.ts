import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  take,
  throwError,
} from 'rxjs';
import { RedditEntry, RedditResponse } from '../models/reddit.interface';
import { RedditMapper } from '../mappers/reddit.mapper';

@Injectable({
  providedIn: 'root',
})
export class RedditService {
  private BASE_URL = 'https://www.reddit.com/r';

  private _currentSubreddit = new BehaviorSubject<string>('space');
  private _currentEntries = new BehaviorSubject<RedditEntry[]>([]);
  private _loading = new BehaviorSubject<boolean>(false);

  private _entriesPerPage = new BehaviorSubject<number>(10);
  private _currentAfter = new BehaviorSubject<string | null>(null);
  private _currentBefore = new BehaviorSubject<string | null>(null);

  public currentEntries$ = this._currentEntries.asObservable();
  public currentSubreddit$ = this._currentSubreddit.asObservable();
  public loading$ = this._loading.asObservable();
  public entriesPerPage$ = this._entriesPerPage.asObservable();

  constructor(private http: HttpClient) {
    this.loadFeed();
  }

  private loadFeed(
    after: string | null = null,
    before: string | null = null
  ): void {
    this._loading.next(true);

    const subreddit = this._currentSubreddit.value;
    const limit = this._entriesPerPage.value;

    this.getSubRedditFeed(subreddit, limit, after, before)
      .pipe(
        take(1),
        finalize(() => this._loading.next(false))
      )
      .subscribe({
        next: (response) => {
          const entries = RedditMapper.transformEntries(response.data.children);
          this._currentEntries.next(entries);

          this._currentAfter.next(response.data.after);
          this._currentBefore.next(response.data.before);
        },
        error: (err) => {
          this._currentEntries.next([]);
        },
      });
  }

  public getSubRedditFeed(
    subreddit: string,
    limit: number,
    after?: string | null,
    before?: string | null
  ): Observable<RedditResponse> {
    let params = new HttpParams().set('limit', limit.toString());

    if (after) params = params.set('after', after);
    if (before) params = params.set('before', before);

    return this.http
      .get<RedditResponse>(`${this.BASE_URL}/${subreddit}.json`, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Reddit Response Error:', error);
    return throwError(
      () => new Error('Failed to fetch Reddit data. Please try again.')
    );
  }
}
