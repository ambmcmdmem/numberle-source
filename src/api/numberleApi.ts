import express from 'express';
import bodyParser from 'body-parser';
import Collation from './Collation';
import { apiCheckDigit } from '../modules/numberleModule';
const server = express();
export const apiPort = process.env.PORT || 5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((request, response, next): void => {
  if (
    apiCheckDigit(Number(request.body.seed)) !== Number(request.body.checkDigit)
  )
    return;

  response.set({
    'Access-Control-Allow-Origin': '*',
  });
  next();
});

server.listen(apiPort);
server.post('/collation', (request, response): void => {
  response.send(
    new Collation(request.body.seed).statusOfProposedSolution(
      request.body.proposedSolution
    )
  );
});

server.post('/getAnswer', (request, response): void => {
  response.send(new Collation(request.body.seed).getAnswer());
});
