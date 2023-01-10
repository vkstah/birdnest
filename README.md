# Birdnest

This repository contains the source code for the Reaktor Summer 2023 Developer Trainee assignment [Birdnest](https://assignments.reaktor.com/birdnest/). You can find the backend repository [here](https://github.com/vkstah/birdnest-backend).

## Developing

After installing dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Implementation

The application can be accessed here: `to be determined.`

The backend is deployed into [railway.app](https://railway.app/), the frontend is deployed into [Vercel](https://vercel.com/).

Some caveats about the application:

- The application will stop fetching data from the Reaktor drones API after 30 minutes of not receiving traffic. Traffic in this case is counted as a connection to the WebSocketServer, which means that the page does not need to be refreshed for the timer to reset.
