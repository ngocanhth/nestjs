import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PublicFile from './publicFile.entity';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
 
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(PublicFile)
    private publicFilesRepository: Repository<PublicFile>,
    private readonly configService: ConfigService
  ) {}
 
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3.upload({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME') || '',
      Body: dataBuffer,
      Key: `${uuid()}-${filename}`
    })
      .promise();
 
    const newFile = this.publicFilesRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location
    });
    await this.publicFilesRepository.save(newFile);
    return newFile;
  }

  async deletePublicFile(fileId: number) {
    const file = await this.publicFilesRepository.findOne({ where: { id: fileId } });
    const s3 = new S3();
    await s3.deleteObject({
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME') || '',
      Key: file ? file.key : '',
    }).promise();
    await this.publicFilesRepository.delete(fileId);
  }

  // async addAvatar(userId: number, imageBuffer: Buffer, filename: string) {
  //   const user = await this.getById(userId);
  //   if (user.avatar) {
  //     await this.deleteUserAvatar(user);
  //   }
  //   const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
  //   await this.userRepository.update(userId, {
  //     ...user,
  //     avatar
  //   });
  //   return avatar;
  // }
 
 
  // async deleteAvatar(userId: number) {
  //   const user = await this.getById(userId);
  //   await this.deleteUserAvatar(user);
 
 
  // }
  // async deleteUserAvatar(user: User) {
  //   const fileId = user.avatar?.id;
  //   if (fileId) {
  //     await this.userRepository.update( user.id, {
  //       ...user,
  //       avatar: null
  //     });
  //     await this.filesService.deletePublicFile(fileId);
  //   }
  // }
}