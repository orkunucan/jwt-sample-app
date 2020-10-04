import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    JWT_SECRET: str(),
    JWT_ISSUER: str(),
    PORT: port(),
  });
}

export default validateEnv;
