import { NextFunction, Request, Response } from 'express';
import TokenService from '../services/token.service';
import { CreateJwtTokenModel } from '../models/requests/create-jwt-token.model';
import { ValidateJwtTokenModel } from '../models/requests/validate-jwt-token.model';

class TokenController {
  public tokenService = new TokenService();

  public generateJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const userJwtData: CreateJwtTokenModel = req.body;
    try {
      const tokenData = this.tokenService.createToken(userJwtData);
      res.status(201).json(tokenData);
    } catch (error) {
      next(error);
    }
  }

  public validateJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const userJwtData: ValidateJwtTokenModel = req.body;
    try {
      const validationResult = this.tokenService.validateToken(userJwtData);
      if (validationResult.tokeIsValid) {
        res.status(202).json(validationResult);      
      } else {
        res.status(400).json(validationResult); 
      }
    } catch (error) {
      next(error);
    }
  }
}

export default TokenController;
