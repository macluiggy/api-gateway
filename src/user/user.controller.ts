import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import config from 'src/config';
import { UserDto } from './dto/user.dto';
import { Observable } from 'rxjs';
import { IUser } from 'src/common/interfaces/user.interface';
import { UserMSG } from 'src/common/constants';

const { apiVersion } = config;

@Controller(`${apiVersion}/user`)
export class UserController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Post()
  create(@Body() user: UserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.CREATE, user);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  // findOne(id: string): Observable<IUser> {
  findOne(@Param() { id }): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Put(':id')
  // update(@Body() user: UserDto, id: string): Observable<IUser> {
  update(@Param() { id }, @Body() user: UserDto): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, user });
  }

  @Delete(':id')
  // delete(id: string): Observable<IUser> {
  delete(@Param() { id }): Observable<IUser> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
