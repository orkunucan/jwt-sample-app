import { IsEmail, IsString } from 'class-validator';

export class CreateJwtTokenModel {
    @IsString()
    public givenName: string;
    
    @IsString()
    public familyName: string;

    @IsString()
    public preferredUsername: string;
    
    @IsEmail()
    public email: string;

    @IsString()
    public sub: string;

    @IsString()
    public iss: string;

    @IsString()
    public exp: Date;

    @IsString()
    public secret: string;
}
