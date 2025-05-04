# Summary on what has been done

This application uses Reddit's public API to provide a custom Reddit experience. It features two main views:

1. **Subreddit Feed** - Displays posts from a selected subreddit with:

   - Search input to change subreddits
   - Options to set page size (5, 10, or 25 posts)
   - Paginated card list of posts
   - Navigation controls to move between pages

2. **Entry Details** - Shows expanded information when a post is selected:

   - Complete entry content and data
   - Hierarchical comment tree with threaded discussions

3. Created new Angular application through terminal command (version 19).
4. Added Angular Material for styling, choose azure-blue.css theme and added general css in styles.scss.
5. Add routes to support two main screens, Reddit Feed and Reddit Entry Details.
6. In app component added container styles, with subreddit title at the top and router-outlet at the bottom.
7. Created multiple folders for each specific purpose.
8. In styles we have mixins.scss which has the mat-icon-size mixin. This is used in multiple style scss files.
9. Services file which has the RedditService. Here are all the http requests methods that are in use. There is a error handler that logs the errors on the console. The state is handled by the service as well, with BehaviourSubjects.
10. Pipes folder with time-ago pipe, which transforms the date to time passed from the comment (ex. 1 day ago).
11. Models folder has the reddit interface file, which has all of the interfaces that are used. There are two types in there, that have the model of the data that is sent from the Reddit API.
12. Mappers folder has a mapper, that maps and parses the data that comes from the API.
13. Animations folder holds the animation used by the comment tree.
14. In the components folder we can find all the components created in the app. Feed and details component are the views, comment-tree is a component used in the details for comments recursion, and the empty state with entry-card are shared among multiple components.
15. All of the building block components, are Angular Material, and used wherever possible.
16. Additionally I used CSS variables across all of the styling files, like colors, fonts, sizes and such.
17. All components are standalone, ChangeDetectionStrategy.OnPush.
18. I also experimented and used signals in RedditEntryDetailsComponent.

# RedditFeed

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.9.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
