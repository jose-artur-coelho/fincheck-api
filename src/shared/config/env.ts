import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
  @IsNotEmpty()
  @IsString()
  jwtSecret: string;

  @IsNotEmpty()
  @IsString()
  databaseUrl: string;
}

export const env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
