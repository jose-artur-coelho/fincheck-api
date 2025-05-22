import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDTO } from './dto/create-bank-account.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { getRequestUser } from 'src/shared/utils/get-request-user';
import { Request } from 'express';
import { UpdateBankAccountDTO } from './dto/update-bank-account.dto';

@UseGuards(AuthGuard)
@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateBankAccountDTO) {
    const userId = getRequestUser(req);
    return this.bankAccountsService.create(dto, userId);
  }

  @Get('/:id')
  retrieve(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.bankAccountsService.retrieve(id, userId);
  }

  @Get()
  retriveAll(@Req() req: Request) {
    const userId = getRequestUser(req);
    return this.bankAccountsService.retrieveAll(userId);
  }

  @Put('/:id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateBankAccountDTO,
  ) {
    const userId = getRequestUser(req);
    return this.bankAccountsService.update(id, dto, userId);
  }

  @Delete('/:id')
  @HttpCode(204)
  delete(@Req() req: Request, @Param('id') id: string) {
    const userId = getRequestUser(req);
    return this.bankAccountsService.delete(id, userId);
  }
}
