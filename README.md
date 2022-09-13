# UNE Advanced Web Programming Course - Demo projects

1. The simple TypeScript app - `une-cinema-typescript`:

   - change to app directory: `cd une-cinema-typescript`
   - run locally: `yarn start`
   - or, run with docker:
     ```bash
     docker build . -t une-awp/une-cinema-typescript
     docker run -p 1234:1234 -p 8000:8000 une-awp/une-cinema-typescript
     ```
   - go to [http://localhost:1234](http://localhost:1234)

2. The full stack app - `une-cinema-react` and `une-cinema-service`:
   - at the root directory (you should see `docker-compose.yml` file)
   - run `docker-compose up`
     - if dependencies change, run `docker-compose up --build` to rebuild images
     - to stop, run `docker-compose down`
   - go to [http://localhost:3000](http://localhost:1234)
   - the sever is available at [http://localhost:8080](http://localhost:8080)
   - the mongodb via docker container can be access via mongodb://localhost:27017
