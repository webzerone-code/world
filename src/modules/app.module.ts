import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { GameUserModule } from './game-user/game-user.module';

@Module({
  imports: [GameModule, UserModule, GameUserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
