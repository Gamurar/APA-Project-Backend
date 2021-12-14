import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { Model } from 'mongoose';
const AhoCorasick = require('./ahocorasick');

const strings = ['Hello World!', 'This is the second string', 'This is the third string'];

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.text) private itemModel: Model<ItemDocument>) {}

  getStrings(): string[] {
    return strings;
  }

  async addString(createItemDto: CreateItemDto): Promise<string> {
    const createdItem = new this.itemModel(createItemDto);
    await createdItem.save();
    return 'String has been added succesfully';
  }

  findStrings(keyword: string): any[] {
    keyword = keyword.toLowerCase();
    const ac = new AhoCorasick([keyword]);
    const result = [];
    for (let str of strings) {
      const lowStr = str.toLowerCase();
      const searchResult = ac.search(lowStr);
      if (searchResult.length > 0) {
        result.push(str);
      }
    }

    return result;
  }
}