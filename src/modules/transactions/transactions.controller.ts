import { Controller, Get, Param, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { getRequestUser } from 'src/shared/utils/get-request-user';
import { Request } from 'express';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/:id')
  retrieve(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.transactionsService.retrieve(id, userId);
  }
}
