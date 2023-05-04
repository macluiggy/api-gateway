import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import config from 'src/config';
import { PassengerDTO } from './dto/passenger.dto';
import { Observable } from 'rxjs';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { PassengerMSG } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';

const { apiVersion } = config;

@ApiTags('passengers')
@Controller(`${apiVersion}/passenger`)
export class PassengerController {
  constructor(private readonly clientProxy: ClientProxySuperFlights) {}
  private _clientProxyPassenger = this.clientProxy.clientProxyPassengers();

  @Post()
  create(@Body() passenger: PassengerDTO): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.CREATE, passenger);
  }

  @Get()
  findAll(): Observable<IPassenger[]> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param() { id }): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(
    @Param() { id },
    @Body() passenger: PassengerDTO,
  ): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.UPDATE, {
      id,
      passenger,
    });
  }

  @Delete(':id')
  delete(@Param() { id }): Observable<IPassenger> {
    return this._clientProxyPassenger.send(PassengerMSG.DELETE, id);
  }
}
