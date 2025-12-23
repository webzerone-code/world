import { Module } from '@nestjs/common';
import { GameModule } from '../game/game.module';
import { UserItemRepository } from '../../infrastructure/repositories/user.item.repository';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { UserBuildingRepository } from '../../infrastructure/repositories/user.building.repository';
import { BuildingRepository } from '../../infrastructure/repositories/building.repository';
import { UserItemsService } from './user.items.service';
import { UserBuildingsController } from './user.buildings.controller';
import { UserItemsController } from './user.items.controller';
import { BuildingPurchaseService } from '../../domain/services/building-purchase.service';
import { UserBuildingsService } from './user.buildings.service';
import { BuyBuildingUseCase } from '../../application/buy.building.usecase';

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
  ],
})
export class GameUserModule {}
