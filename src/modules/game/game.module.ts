import { Module } from '@nestjs/common';
import { ItemRepository } from '../../infrastructure/repositories/item.repository';
import { BuildingRepository } from '../../infrastructure/repositories/building.repository';
import { ItemsService } from './items.service';
import { BuildingsService } from './buildings.service';
import { ItemsController } from './items.controller';
import { BuildingsController } from './buildings.controller';

@Module({
  imports: [],
  controllers: [ItemsController, BuildingsController],
  providers: [
    {
      provide: ItemRepository,
      useFactory: () => new ItemRepository('items.json'), // pass your JSON file here
    },
    {
      provide: BuildingRepository,
      useFactory: (itemRepository: ItemRepository) =>
        new BuildingRepository('buildings.json', itemRepository),
      inject: [ItemRepository],
    },
    ItemsService,
    BuildingsService,
  ],
  exports: [ItemRepository, BuildingRepository],
})
export class GameModule {}
