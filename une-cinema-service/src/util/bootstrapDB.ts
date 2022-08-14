import 'dotenv/config';
import connect from './connectDB';

import UserModel from "../model/user.model";
import users from "../data/user.json";

import MovieModel from '../model/movie.model';
import movies from '../data/movies.json';

import SessionModel from '../model/session.model';
import sessions from '../data/sessions.json';

import TheaterModel from "../model/theatre.model";
import theraters from "../data/theaters.json";

const run = async () => {
  try {
    await connect();

    await UserModel.deleteMany();
    await UserModel.create(users);

    await MovieModel.deleteMany();
    await MovieModel.insertMany(movies);

    await SessionModel.deleteMany();
    await SessionModel.insertMany(sessions);

    await TheaterModel.deleteMany();
    await TheaterModel.insertMany(theraters);

    process.exit(0)
  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

run();