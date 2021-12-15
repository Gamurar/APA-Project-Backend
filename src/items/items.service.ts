import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { Model } from 'mongoose';
const AhoCorasick = require('./ahocorasick');

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private itemModel: Model<ItemDocument>) {}

  async getStrings(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async addString(createItemDto: CreateItemDto): Promise<string> {
    const createdItem = new this.itemModel(createItemDto);
    await createdItem.save();
    return 'String has been added succesfully';
  }

  async findStrings(keyword: string): Promise<Item[]> {
    const items = await this.getStrings();
    keyword = keyword.toLowerCase();
    const ac = new AhoCorasick([keyword]);
    const result = [];
    for (const item of items) {
      const lowStr = item.text.toLowerCase();
      const searchResult = ac.search(lowStr);
      if (searchResult.length > 0) {
        result.push(item);
      }
    }

    return result;
  }

  async removeString(id: string) {
    const res = await this.itemModel.remove({ _id: id });
    if (res.deletedCount) {
      return `String with id ${id} has been removed`;
    } else {
      return `Error! There is no string with id ${id}`;
    }
  }
}
