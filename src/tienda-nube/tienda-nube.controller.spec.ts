import { Test, TestingModule } from '@nestjs/testing';
import { TiendaNubeController } from './tienda-nube.controller';
import { TiendaNubeService } from './tienda-nube.service';

describe('TiendaNubeController', () => {
  let controller: TiendaNubeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiendaNubeController],
      providers: [TiendaNubeService],
    }).compile();

    controller = module.get<TiendaNubeController>(TiendaNubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
