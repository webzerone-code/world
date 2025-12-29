import { Module } from '@nestjs/common';
import { GameModule } from '../game/game.module';
import { UserItemRepository } from '../../infrastructure/repositories/user.item.repository';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { UserBuildingRepository } from '../../infrastructure/repositories/user.building.repository';
import { BuildingRepository } from '../../infrastructure/repositories/building.repository';
import { UserBuildingsController } from './user.buildings.controller';
import { UserItemsController } from './user.items.controller';
import { BuildingPurchaseService } from '../../domain/services/building-purchase.service';
import { BuyBuildingUseCase } from '../../application/usecases/buy.building.usecase';
import { UserItemsService } from '../../application/services/user.items.service';
import { UserBuildingsService } from '../../application/services/user.buildings.service';
import { OperateBuildingUseCase } from '../../application/usecases/operate.building.usecase';

@Module({
  imports: [GameModule],
  controllers: [UserBuildingsController, UserItemsController],
  providers: [
    {
      provide: UserItemRepository,
      useFactory: (itemRepository: ItemRepository) =>
        new UserItemRepository('userItems.json', itemRepository), // pass your JSON file here
      inject: [ItemRepository],
    },
    {
      provide: UserBuildingRepository,
      useFactory: (buildingRepository: BuildingRepository) =>
        new UserBuildingRepository('userBuildings.json', buildingRepository), // pass your JSON file here
      inject: [BuildingRepository],
    },
    BuildingPurchaseService,
    UserItemsService,
    UserBuildingsService,
    BuyBuildingUseCase,
    OperateBuildingUseCase,
  ],
})
export class GameUserModule {}
