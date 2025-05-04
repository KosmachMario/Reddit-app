import { Routes } from '@angular/router';

import { RedditFeedComponent } from './components/reddit-feed/reddit-feed.component';
import { RedditEntryDetailsComponent } from './components/reddit-entry-details/reddit-entry-details.component';

export const routes: Routes = [
  { path: '', component: RedditFeedComponent },
  { path: 'entry/:id', component: RedditEntryDetailsComponent },
  { path: '**', redirectTo: '' },
];
