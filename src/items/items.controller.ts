import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';

@Controller()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll() {
    const response = await this.itemsService.getStrings();
    return JSON.stringify(response);
  }

  @Get('search/:keyword')
  async findStrings(@Param() params) {
    const response = await this.itemsService.findStrings(params.keyword);
    return JSON.stringify(response);
  }

  @Post('add-string')
  async addString(@Body() createItemDto: CreateItemDto) {
    const response = { data: '' };
    response.data = await this.itemsService.addString(createItemDto);
    return JSON.stringify(response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.itemsService.removeString(id);
    return JSON.stringify(response);
  }
}
