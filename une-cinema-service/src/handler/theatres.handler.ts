import express, { Request, Response } from "express";

const theatreHandler = express.Router();

theatreHandler.get("/", (req: Request, res: Response) => {
  try {
    return res.status(200).send([
      {
        "_id": 1,
        "rows": 8,
        "seats": 9,
        "aisles": [3, 7]
      },
      {
        "_id": 2,
        "rows": 7,
        "seats": 8,
        "aisles": [4]
      },
      {
        "_id": 3,
        "rows": 12,
        "seats": 10,
        "aisles": [5]
      }
    ]);
  } catch (err) {
    return res.status(500).send(err);
  }
})

export default theatreHandler;