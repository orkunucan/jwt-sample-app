import 'dotenv/config';
import App from './app';
import IndexRoute from './routes/index.route';
import TokenRoute from './routes/token.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new TokenRoute(),
]);

app.listen();
