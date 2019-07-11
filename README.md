## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
**Note: unit tests contains console.error output due to usage of hooks.**

## Bonus Features

### Cache

Cache is implemented using local storage. I'm not a fan of pushing information to the local storage. In my opinion, things like that should be done on the side of server. Caching response on server would affect all users and trade off will be data transfer in network.

### Deploy

Application is deployed to GitHub Pages. You can reach it at [https://nikas-lebedenko.github.io/artist-event-assignment](https://nikas-lebedenko.github.io/artist-event-assignment).
_Note: GitHub Pages does not allow routing, so if you will refresh application in artist preview window it will return 404. Despite that, you can freely navigate in application because it uses browser routing._
