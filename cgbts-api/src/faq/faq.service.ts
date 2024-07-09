import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prismaService: PrismaService) {}
  async saveFaq(createFaqDto: CreateFaqDto) {
    try {
      const save = await this.prismaService.faq.create({
        data: createFaqDto,
      });

      return save;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  findAll() {
    return `This action returns all faq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} faq`;
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    return await this.prismaService.faq.update({
      where: { faq_id: id },
      data: updateFaqDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} faq`;
  }
}
