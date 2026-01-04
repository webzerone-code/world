import { Controller, Get } from '@nestjs/common';
import { GeneratorService } from './generator.service';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get()
  generate(): any {
    const tiles: {
      id: string;
      userId: string;
      xPosition: number;
      yPosition: number;
      tileType: 'Empty' | 'Used';
    }[] = [];
    let x = 1;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        tiles.push({
          id: x.toString(),
          userId: '1',
          xPosition: i,
          yPosition: j,
          tileType: 'Empty',
        });
        x++;
      }
    }
    return tiles;
  }
}
