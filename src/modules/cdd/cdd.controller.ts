import { Body, Controller, Post } from '@nestjs/common';
import { ContentDTO } from './cdd.dto';

@Controller('cdd')
export class CddController {
  /**
   * 上传图片信息
   */
  @Post('/createPhotos')
  createPhotos(@Body() contents: ContentDTO[]) {
    console.log(contents);
  }
  /**
   * 删除图片信息
   */
  /**
   * 审核图片及修改信息
   */
  /**
   * 获取所有图片集合
   */
  /**
   * 添加艺人信息
   */
  /**
   * 删除艺人信息
   */
  /**
   * 修改艺人信息
   */
  /**
   * 获取所有艺人集合
   */
  /**
   * 新增昵称
   */
  /**
   * 删除昵称
   */
  /**
   * 修改昵称
   */
  /**
   * 获取所有昵称集合
   */
}
