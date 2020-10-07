import { IsString } from 'class-validator';

export class ValidateJwtTokenModel {
    @IsString()
    public token: string;

    @IsString()
    public secret: string;
}
