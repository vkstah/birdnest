# Birdnest

This repository contains the source code for the Reaktor Summer 2023 Developer Trainee assignment [Birdnest](https://assignments.reaktor.com/birdnest/). You can find the backend repository [here](https://github.com/vkstah/birdnest-backend).

## Developing

After installing dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Notes

The application can be accessed here: [Birdnest Application](https://birdnest-blue.vercel.app/)

The backend is deployed to [railway.app](https://railway.app/), the frontend is deployed to [Vercel](https://vercel.com/).

Some caveats about the application:

- There are two repositories: the frontend repository (this) as well as the [backend repository](https://github.com/vkstah/birdnest-backend).

- The application will stop fetching data from the Reaktor drones API after 30 minutes of not receiving traffic. Traffic in this case is counted as a connection to the WebSocketServer, which means that the page does not need to be refreshed for the traffic timer to reset.
