import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { getRequestUser } from 'src/shared/utils/get-request-user';
import { Request } from 'express';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('/:id')
  find(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.transactionsService.find(id, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = getRequestUser(req);
    return this.transactionsService.findAll(userId);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateTransactionDTO) {
    const userId = getRequestUser(req);
    return this.transactionsService.create(dto, userId);
  }

  @Delete('/:id')
  delete(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.transactionsService.delete(id, userId);
  }
}
