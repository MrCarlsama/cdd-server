import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArtistsService } from './artists.service';
import { ArtistsDTO, ContentDTO } from './cdd.dto';
import { PhotosService } from './photos.service';
import { Artists } from './entity/artists.entity';

@ApiTags('CddModule')
@Controller('cdd')
export class CddController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly photosService: PhotosService,
  ) {}

  // @Post('/createPhotos')
  // createPhotos(@Body() contents: ContentDTO[]) {
  //   console.log(contents);
  // }
  /**
   * 新增图片信息
   */
  @Post('/photos')
  createPhotos(@Body() photos: ContentDTO) {
    return this.photosService.createPhotos(photos);
  }
  /**
   * 删除图片信息
   */
  @Delete('/photos/:id')
  deletePhotos(@Param('id') id) {}
  /**
   * 更新图片信息
   */
  @Put('/photos/:id')
  updatePhotos(@Param('id') id) {}
  /**
   * 获取所有图片集合
   */
  @Get('/photos/:id')
  getPhotos(@Param('id') id) {}

  /**
   * 添加艺人信息
   */
  @Post('/artists')
  @ApiOperation({
    summary: '新增艺人信息',
  })
  @UsePipes(new ValidationPipe())
  createArtists(@Body() artists: ArtistsDTO) {
    return this.artistsService.createArtists(artists);
  }
  /**
   * 删除艺人信息
   */
  @Delete('/artists/:id')
  deleteArtists(@Param('id') id) {
    return this.artistsService.deleteArtists(id);
  }
  /**
   * 修改艺人信息
   */
  @Put('/artists/id')
  updateArtists(@Param('id') id, @Body() artists: Artists) {
    return this.artistsService.updateArtists(id, artists);
  }
  /**
   * 获取所有艺人集合
   */
  @Get('/artists')
  getArtist(@Query() query) {
    return this.artistsService.getArtists(query);
  }
  @Get('/artists/:id')
  getArtists(@Param('id') id) {
    return this.artistsService.getArtistById(id);
  }
  /**
   * 新增昵称
   */
  @Post('/nicknames')
  createNicknames() {}
  /**
   * 删除昵称
   */
  @Delete('/nicknames/:id')
  deleteNicknames(@Param('id') id) {}
  /**
   * 修改昵称
   */
  @Put('/nicknames/:id')
  updateNicknames(@Param('id') id) {}
  /**
   * 获取所有昵称集合
   */
  @Get('/nicknames/:id')
  getNicknames(@Param('id') id) {}
}
