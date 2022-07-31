import express, { Request, Response } from "express";

import validateSchema from '../middleware/validateSchema';

import { getMovieByIdSchema } from '../schema/movie.schema';

const movieHandler = express.Router();

const MOVIES = [
  {
    "_id": 1,
    "title": "Jurassic World Dominion",
    "description": "This June, experience the epic conclusion to the Jurassic era as two generations unite for the first time. Chris Pratt and Bryce Dallas Howard are joined by Oscar®-winner Laura Dern, Jeff Goldblum, and Sam Neill in Jurassic World Dominion, a bold, timely, and breathtaking new adventure that spans the globe. From Jurassic World architect and director Colin Trevorrow, Dominion takes place four years after Isla Nublar has been destroyed. Dinosaurs now live—and hunt—alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history’s most fearsome creatures. Jurassic World Dominion, from Universal Pictures and Amblin Entertainment, propels the more than $5 billion franchise into daring, uncharted territory, featuring never-seen dinosaurs, breakneck action, and astonishing new visual effects. The film features new cast members DeWanda Wise (She’s Gotta Have It), Emmy nominee Mamoudou Athie (Archive 81), Dichen Lachman (Agents of S.H.I.E.L.D.), Scott Haze (Minari), and Campbell Scott (The Amazing Spider-Man 2). The film’s returning cast includes BD Wong as Dr. Henry Wu, Justice Smith as Franklin Webb, Daniella Pineda as Dr. Zia Rodriguez, and Omar Sy as Barry Sembenè. Jurassic World Dominion is directed by Colin Trevorrow, who steered 2015’s Jurassic World to a record-shattering $1.7 billion global box office. The screenplay is by Emily Carmichael (Battle at Big Rock) & Colin Trevorrow from a story by Derek Connolly (Jurassic World) & Trevorrow, based on characters created by Michael Crichton. Jurassic World Dominion is produced by acclaimed franchise producers Frank Marshall p.g.a. and Patrick Crowley p.g.a. and is executive produced by legendary, Oscar®-winning franchise creator Steven Spielberg, Alexandra Derbyshire, and Colin Trevorrow.",
    "duration": 147,
    "directors": ["Colin Trevorrow"],
    "stars": ["Chris Pratt", "Bryce Dallas Howard", "Laura Dern"],
    "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/15020/images/largeposter.jpg"
  },
  {
    "_id": 2,
    "title": "Top Gun: Maverick",
    "description": "After more than thirty years of service as one of the Navy’s top aviators, Pete “Maverick” Mitchell (Tom Cruise) is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. When he finds himself training a detachment of Top Gun graduates for a specialized mission the likes of which no living pilot has ever seen, Maverick encounters Lt. Bradley Bradshaw (Miles Teller), call sign: “Rooster,” the son of Maverick’s late friend and Radar Intercept Officer Lt. Nick Bradshaw, aka “Goose”. Facing an uncertain future and confronting the ghosts of his past, Maverick is drawn into a confrontation with his own deepest fears, culminating in a mission that demands the ultimate sacrifice from those who will be chosen to fly it.",
    "duration": 130,
    "directors": ["Joseph Kosinski"],
    "stars": ["Tom Cruise", "Jennifer Connelly", "Miles Teller"],
    "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/14621/images/largeposter.jpg"
  },
  {
    "_id": 3,
    "title": "Doctor Strange in the Multiverse of Madness",
    "description": "Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across multiverses, to battle multiple threats, including other-universe versions of himself, which threaten to wipe out millions across the multiverse. They seek help from Wanda the Scarlet Witch, Wong and others.",
    "duration": 126,
    "directors": ["Sam Raimi"],
    "stars": ["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor"],
    "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/15657/images/largeposter.jpg"
  },
  {
    "_id": 4,
    "title": "Downton Abbey: A New Era",
    "description": "From award-winning creator, Julian Fellowes comes the motion picture event DOWNTON ABBEY: A NEW ERA. The much-anticipated cinematic return of the global phenomenon reunites the beloved cast as they go on a grand journey to the South of France to uncover the mystery of the Dowager Countess’ newly inherited villa.",
    "duration": 125,
    "directors": ["Simon Curtis"],
    "stars": ["Hugh Bonneville", "Jim Carter", "Michelle Dockery"],
    "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/15947/images/largeposter.jpg"
  },
  {
    "_id": 5,
    "title": "The Lost City",
    "description": "Brilliant, but reclusive author Loretta Sage (Sandra Bullock) has spent her career writing about exotic places in her popular romance-adventure novels featuring handsome cover model Alan (Channing Tatum), who has dedicated his life to embodying the hero character, “Dash.” While on tour promoting her new book with Alan, Loretta is kidnapped by an eccentric billionaire (Daniel Radcliffe) who hopes that she can lead him to the ancient lost city’s treasure from her latest story. Wanting to prove that he can be a hero in real life and not just on the pages of her books, Alan sets off to rescue her. Thrust into an epic jungle adventure, the unlikely pair will need to work together to survive the elements and find the ancient treasure before it’s lost forever. ",
    "duration": 112,
    "directors": ["Aaron Nee", "Adam Nee"],
    "stars": ["Sandra Bullock", "Channing Tatum", "Daniel Radcliffe"],
    "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/16065/images/largeposter.jpg"
  },
  {
    "_id": 6,
    "title": "Mothering Sunday",
    "description": "The story takes place on Mother's Day in 1924. Fir Mr. and Mrs. Evan give their housekeeper, Jane Fairchild (Odessa Young), the day off, as the couple are set to go to their neighbour's house to celebrate his engagement. The truth is Jane and the neighbour, Paul, have been having an affair for many years.",
    "duration": 104,
    "directors": ["Eva Husson"],
    "stars": ["Odessa Young", "Josh O'Connor", "Colin Firth"],
    "poster": "https://cdn.eventcinemas.com.au/cdn/resources/movies/16173/images/largeposter.jpg"
  }
];

// Get movies
movieHandler.get("/", (req: Request, res: Response) => {
  res.status(200).json(MOVIES);
})

movieHandler.get("/:movieId", validateSchema(getMovieByIdSchema), (req: Request, res: Response) => {
  const result = MOVIES.find((m) => (m._id.toString() === req.params.movieId));
  if(result) {
    res.status(200).json(result);
  }
  res.sendStatus(404);
})

// Get sessions for a movie
movieHandler.get("/:movieId/session", (req: Request, res: Response) => {
  res.status(200).json([  
    {
      "_id": 1,
      "movieId": 1,
      "theatreId": 1,
      "time": "7:15 PM"
    },
  ])
})

export default movieHandler;