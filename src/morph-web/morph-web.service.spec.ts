import { Test, TestingModule } from '@nestjs/testing';
import { MorphWebService } from './morph-web.service';

describe('MorphWebService', () => {
  let service: MorphWebService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MorphWebService],
    }).compile();

    service = module.get<MorphWebService>(MorphWebService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
