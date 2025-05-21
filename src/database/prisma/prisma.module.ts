import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  exports: [PrismaService],
})
export class PrismaModule {}
