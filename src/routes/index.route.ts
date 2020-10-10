import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}jwt-validator`, this.indexController.jwtValidator);
    this.router.get(`${this.path}jwt-generator`, this.indexController.jwtGenerator);
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}health`, this.indexController.health);
  }
}

export default IndexRoute;
