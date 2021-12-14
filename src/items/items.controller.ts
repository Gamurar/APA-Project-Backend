import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): string {
    const response = { data: [''], };
    response.data = this.itemsService.getStrings();
    return JSON.stringify(response);
  }

  @Get('search/:keyword')
  findStrings(@Param() params): string {
    const response = { data: [''], };
    response.data = this.itemsService.findStrings(params.keyword);
    return JSON.stringify(response);
  }

  @Post('add-string')
  async addString(@Body() createItemDto: CreateItemDto) {
    const response = { data: '', };
    response.data = await this.itemsService.addString(createItemDto);
    return JSON.stringify(response);
  }
}
