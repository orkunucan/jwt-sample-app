import { NextFunction, Request, Response } from 'express';
import * as path from 'path';

class IndexController {

  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(`${__dirname}/../public/html/index.html`));
    } catch (error) {
      next(error);
    }
  }

  public jwtValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(`${__dirname}/../public/html/jwt-validator.html`));
    } catch (error) {
      next(error);
    }
  }

  public jwtGenerator = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(`${__dirname}/../public/html/jwt-generator.html`));
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
