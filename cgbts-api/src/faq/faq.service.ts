import { Injectable } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FaqService {
  constructor(private readonly prismaService: PrismaService) {}
  async saveFaq(createFaqDto: CreateFaqDto) {
    try {
      const save = await this.faq(createFaqDto);

      if (!save) {
        return { respCode: 0, respMessage: 'Save Error!' };
      }

      return { respCode: 1, respMessage: 'FAQ saved!', FAQ: save };
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async faq(data: CreateFaqDto): Promise<any> {
    try {
      const saveFaq = this.prismaService.faq.create({
        data: {
          question: data.question,
          answer: data.answer,
          category_id: data.category_id,
        },
      });

      return saveFaq;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  async update(id: number, updateFaqDto: UpdateFaqDto) {
    return await this.prismaService.faq.update({
      where: { faq_id: id },
      data: updateFaqDto,
    });
  }
}
