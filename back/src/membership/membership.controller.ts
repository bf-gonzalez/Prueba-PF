import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateMembershipDto, UpdateMembershipDto } from './membership.dto';

@ApiTags('membership')
@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Post()
  @HttpCode(201)
  addMembership(@Body() createMembership: CreateMembershipDto) {
    console.log('membershipController=', createMembership);
    return this.membershipService.addMembership(createMembership);
  }

  @Get()
  @HttpCode(200)
  getMerberships() {
    return this.membershipService.getMerberships();
  }

  @Get('deleted')
  @HttpCode(200)
  getDeletedMemberships() {
    return this.membershipService.getDeletedMemberships();
  }

  @Get(':id')
  getMembreshipById(@Param('id', ParseUUIDPipe) id: string) {
    return this.membershipService.getMembershipById(id);
  }

  @Delete(':id')
  removeMembership(@Param('id', ParseUUIDPipe) id: string) {
    console.log('controller borrar membresia', id);
    return this.membershipService.removeMembership(id);
  }

  @Put(':id')
  updateMembership(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipService.updateMembership(id, updateMembershipDto);
  }

  @Put('deleted/:id')
  deleteMembership(@Param('id', ParseUUIDPipe) id: string) {
    return this.membershipService.deleteMembership(id);
  }

  @Post('/prueba')
  Membership(@Body() data) {
    try {
      console.log('membershipController=', data);
      return data;
    } catch (error) {
      console.error;
    }
  }
}
