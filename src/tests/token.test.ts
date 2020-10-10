import * as request from 'supertest';
import App from '../app';
import TokenRoute from '../routes/token.route';
import { ValidateJwtTokenModel } from '../models/requests/validate-jwt-token.model';
import { CreateJwtTokenModel } from '../models/requests/create-jwt-token.model';

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Tokens', () => {
  describe('[POST] /api/v1/tokens/generate-jwt/', () => {
    it('response statusCode 201 / created', async () => {
      const createData: CreateJwtTokenModel = {
          givenName: 'John',
          familyName: 'Doe',
          email: 'john.doe@example.com',
          preferredUsername: 'john.doe',
          sub: '10001',
          iss: 'app://sample-app',
          exp: new Date((new Date().getTime()) + (1000 * 10)),
          secret: 'TEMP_SECRET'
      };
      const tokenRoute = new TokenRoute();
      const app = new App([tokenRoute]);

      return request(app.getServer())
      .post(`${tokenRoute.path}generate-jwt/`)
      .send(createData)
      .expect(201);
    });
  });

  describe('[POST] /api/v1/tokens/validate-jwt/', () => {
    it('response statusCode 202 / created', async () => {
      const validateData: ValidateJwtTokenModel = {
        secret: 'TEMP_SECRET',
        //valid until 2100-01-01
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDAwMSIsImlzcyI6ImFwcDovL3NhbXBsZS1hcHAiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiam9obi5kb2UiLCJnaXZlbl9uYW1lIjoiSm9obiIsImZhbWlseV9uYW1lIjoiRG9lIiwiaWF0IjoxNjAyMzE4OTM1LCJleHAiOjQxMDI0NDQ3OTl9.7NAr6Vde3XMnjJ5EGsXWrwcNJ7uVbvex03A_B-ADT1g'
      };
      const tokenRoute = new TokenRoute();
      const app = new App([tokenRoute]);

      return request(app.getServer())
      .post(`${tokenRoute.path}validate-jwt/`)
      .send(validateData)
      .expect(202);
    });
  });
});
