import { Router } from 'express';
import { CreateJwtTokenModel } from '../models/requests/create-jwt-token.model';
import { ValidateJwtTokenModel } from '../models/requests/validate-jwt-token.model';
import TokenController from '../controllers/token.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class TokenRoute implements Route {
  public path = '/api/v1/tokens/';
  public router = Router();
  public tokenController = new TokenController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}generate-jwt/`, validationMiddleware(CreateJwtTokenModel), this.tokenController.generateJwtToken);
    this.router.post(`${this.path}validate-jwt/`, validationMiddleware(ValidateJwtTokenModel), this.tokenController.validateJwtToken);
  }
}

export default TokenRoute;
