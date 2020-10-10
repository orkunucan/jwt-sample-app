import * as jwt from 'jsonwebtoken';
import { CreateJwtTokenModel } from '../models/requests/create-jwt-token.model';
import { DataStoredInToken } from '../interfaces/auth.interface';
import { TokenDataModel } from '../models/responses/token-data.model';
import { ValidateJwtTokenModel } from '../models/requests/validate-jwt-token.model';
import { TokenStateModel } from '../models/responses/token-state.model';

class TokenService {

  public createToken(tokenUser: CreateJwtTokenModel): TokenDataModel {
    const dataStoredInToken: DataStoredInToken = {
      sub: tokenUser.sub,
      iss: tokenUser.iss,
      email: tokenUser.email,
      preferred_username: tokenUser.preferredUsername,
      given_name: tokenUser.givenName,
      family_name: tokenUser.familyName
    };
    const secret: string = tokenUser.secret;

    var expiresAt = new Date(tokenUser.exp);
    var now = new Date();
    var dif = expiresAt.getTime() - now.getTime();    
    const expiresIn: number = Math.floor(Math.abs(dif / 1000));

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public validateToken(tokenData: ValidateJwtTokenModel): TokenStateModel {
    const verificationResponse = this.verifySafe(tokenData.token, tokenData.secret);
    if (verificationResponse.tokeIsValid) {
      return verificationResponse;
    }

    return { 
      tokeIsValid: false, 
      tokenData: this.decodeSafe(tokenData.token)
    };
  }

  private verifySafe(token: string, secret: string) {
    try {
      const verificationResponse = jwt.verify(token, secret);

      return { 
        tokeIsValid: verificationResponse != null, 
        tokenData: verificationResponse
      };
    } catch (error) {
      return { 
        tokeIsValid: false, 
        tokenData: null
      };
    }
  }

  private decodeSafe(token: string): null | { [key: string]: any } | string {
    try {
      return jwt.decode(token);
    } catch (error) {
      return null;
    }
  }
}

export default TokenService;
