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
  private _beforeHistory = new BehaviorSubject<string[]>([]);

  public currentSubreddit$ = this._currentSubreddit.asObservable();
  public currentEntries$ = this._currentEntries.asObservable();
  public loading$ = this._loading.asObservable();
  public entriesPerPage$ = this._entriesPerPage.asObservable();
  public currentAfter$ = this._currentAfter.asObservable();
  public beforeHistory$ = this._beforeHistory.asObservable();

  constructor(private http: HttpClient) {
    this.loadFeed();
  }

  private loadFeed(
    after: string | null = null,
    isBefore: boolean = false
  ): void {
    this._loading.next(true);

    const subreddit = this._currentSubreddit.value;
    const limit = this._entriesPerPage.value;

    this.getSubRedditFeed(subreddit, limit, after)
      .pipe(
        take(1),
        finalize(() => this._loading.next(false))
      )
      .subscribe({
        next: (response) => {
          const entries = RedditMapper.transformEntries(response.data.children);
          this._currentEntries.next(entries);

          this._currentAfter.next(response.data.after);
          if (!isBefore) {
            this.addBeforeToHistory(after);
          }
        },
        error: (err) => {
          this._currentEntries.next([]);
        },
      });
  }

  public getSubRedditFeed(
    subreddit: string,
    limit: number,
    after?: string | null
  ): Observable<RedditResponse> {
    let params = new HttpParams().set('limit', limit.toString());

    if (after) params = params.set('after', after);

    return this.http
      .get<RedditResponse>(`${this.BASE_URL}/${subreddit}.json`, { params })
      .pipe(catchError(this.handleError));
  }

  public goToNextPage(): void {
    const after = this._currentAfter.value;
    if (after) {
      this.loadFeed(after);
    }
  }

  public goToPreviousPage(): void {
    const before = this._beforeHistory.value;
    if (before.length > 1) {
      const lastBefore = before[before.length - 2];
      this.loadFeed(lastBefore, true);
      this._beforeHistory.next(before.slice(0, -1));
    } else {
      this.loadFeed();
      this._beforeHistory.next([]);
    }
  }

  public setSubreddit(subreddit: string): void {
    this._currentSubreddit.next(subreddit);
    this.resetAndLoadFeed();
  }

  public setEntriesPerPage(count: number): void {
    this._entriesPerPage.next(count);
    this.resetAndLoadFeed();
  }

  private resetAndLoadFeed(): void {
    this._currentAfter.next(null);
    this._beforeHistory.next([]);
    this.loadFeed();
  }

  private addBeforeToHistory(before: string | null): void {
    if (!before) return;

    const history = this._beforeHistory.value;

    if (!history.includes(before)) {
      history.push(before);
      this._beforeHistory.next(history);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('Reddit Response Error:', error);
    return throwError(
      () => new Error('Failed to fetch Reddit data. Please try again.')
    );
  }
}
