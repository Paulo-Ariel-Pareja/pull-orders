import { Test, TestingModule } from '@nestjs/testing';
import { MorphWebController } from './morph-web.controller';
import { MorphWebService } from './morph-web.service';

describe('MorphWebController', () => {
  let controller: MorphWebController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MorphWebController],
      providers: [MorphWebService],
    }).compile();

    controller = module.get<MorphWebController>(MorphWebController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
