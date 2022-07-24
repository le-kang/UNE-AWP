import express, { Request, Response } from "express";

const movieRouter = express.Router();

// Get movies
movieRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json([
    {
      "_id": 1,
      "title": "Jurassic World Dominion",
      "description": "This June, experience the epic conclusion to the Jurassic era as two generations unite for the first time. Chris Pratt and Bryce Dallas Howard are joined by Oscar®-winner Laura Dern, Jeff Goldblum, and Sam Neill in Jurassic World Dominion, a bold, timely, and breathtaking new adventure that spans the globe. From Jurassic World architect and director Colin Trevorrow, Dominion takes place four years after Isla Nublar has been destroyed. Dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures. Jurassic World Dominion, from Universal Pictures and Amblin Entertainment, propels the more than $5 billion franchise into daring, uncharted territory, featuring never-seen dinosaurs, breakneck action, and astonishing new visual effects. The film features new cast members DeWanda Wise (She’s Gotta Have It), Emmy nominee Mamoudou Athie (Archive 81), Dichen Lachman (Agents of S.H.I.E.L.D.), Scott Haze (Minari), and Campbell Scott (The Amazing Spider-Man 2). The film’s returning cast includes BD Wong as Dr. Henry Wu, Justice Smith as Franklin Webb, Daniella Pineda as Dr. Zia Rodriguez, and Omar Sy as Barry Sembenè. Jurassic World Dominion is directed by Colin Trevorrow, who steered 2015’s Jurassic World to a record-shattering $1.7 billion global box office. The screenplay is by Emily Carmichael (Battle at Big Rock) & Colin Trevorrow from a story by Derek Connolly (Jurassic World) & Trevorrow, based on characters created by Michael Crichton. Jurassic World Dominion is produced by acclaimed franchise producers Frank Marshall p.g.a. and Patrick Crowley p.g.a. and is executive produced by legendary, Oscar®-winning franchise creator Steven Spielberg, Alexandra Derbyshire, and Colin Trevorrow.",
      "duration": 147,
      "directors": ["Colin Trevorrow"],
      "stars": ["Chris Pratt", "Bryce Dallas Howard", "Laura Dern"],
      "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/15020/images/largeposter.jpg"
    }
  ])
})

// Get sessions for a movie
movieRouter.get("/:movieId/session", (req: Request, res: Response) => {
  res.status(200).json([  
    {
      "_id": 1,
      "movieId": 1,
      "theaterId": 1,
      "time": "7:15 PM"
    },
  ])
})

export default movieRouter;