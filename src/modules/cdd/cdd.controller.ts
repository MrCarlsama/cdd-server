import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArtistsService } from './artists.service';
import { ArtistsDTO, ContentDTO, UrlsDTO } from './cdd.dto';
import { PhotosService } from './photos.service';
import { Artists } from './entity/artists.entity';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('CddModule')
@Controller('cdd')
export class CddController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly photosService: PhotosService,
  ) {}

  /**
   * 新增图片信息
   */
  @Post('/photos')
  createPhotos(@Body() { data }: { data: ContentDTO }) {
    return this.photosService.createPhotos(data);
  }
  /**
   * 删除图片信息
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/photos/:id')
  deletePhotos(@Param('id') id) {
    return this.photosService.deletePhoto(id);
  }
  /**
   * 更新图片信息
   */
  @Patch('/photos/:id')
  updatePhotos(@Param('id') id) {}
  /**
   * 获取所有图片集合
   */
  @Get('/photos')
  getPhotos(@Query() query) {
    return this.photosService.getPhotos(query);
  }

  /**
   * 批量审核图片
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/photos/audit')
  auditPhotos(@Body() data) {
    return this.photosService.auditPhotos(data);
  }
  /**
   * 导出图片
   * @param data
   * @returns
   */
  @Post('/photos/export')
  exportPhotos(@Body() data) {
    console.log(data);
    return this.photosService.exportPhotos(data);
  }

  @Post('/photos/urls')
  getPhotosByCreeper(@Body() data: UrlsDTO) {
    return this.photosService.getPhotosByCreeper(data);
  }

  /**
   * 添加艺人信息
   */
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @Delete('/artists/:id')
  deleteArtists(@Param('id') id) {
    return this.artistsService.deleteArtists(id);
  }
  /**
   * 修改艺人信息
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('/artists/:id')
  updateArtists(@Param('id') id, @Body() artists: Artists) {
    return this.artistsService.updateArtists(id, artists);
  }
  /**
   * 获取所有艺人集合
   */
  @Get('/artists')
  getArtists(@Query() query) {
    return this.artistsService.getArtists(query);
  }
  @Get('/artists/:id')
  getArtist(@Param('id') id) {
    return this.artistsService.getArtistById(id);
  }

  /**
   * 初始化声优表
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/artists/init')
  initializeArtists() {
    return this.artistsService.initializeArtists();
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
  @Patch('/nicknames/:id')
  updateNicknames(@Param('id') id) {}
  /**
   * 获取所有昵称集合
   */
  @Get('/nicknames/:id')
  getNicknames(@Param('id') id) {}
}
