import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';
import { GameUserModule } from './game-user/game-user.module';
import { GeneratorModule } from './generator/generator.module';

@Module({
  imports: [GameModule, UserModule, GameUserModule, GeneratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
