import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        process.env.DATABASE_URL
          ? {
              type: 'postgres',
              url: process.env.DATABASE_URL,
              ssl: true,
              extra: {
                ssl: {
                  rejectUnauthorized: false,
                },
              },
              entities: [User],
              synchronize: false,
            }
          : {
              type: 'postgres',
              host: config.get('POSTGRES_HOST'),
              port: config.get('POSTGRES_PORT'),
              database: config.get('POSTGRES_DATABASE'),
              entities: [User],
              synchronize: false,
            },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
