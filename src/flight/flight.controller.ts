import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FlightMSG } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { FlightDTO } from './dto/flight.dto';
import { Observable } from 'rxjs';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@ApiTags('flights')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/flights')
export class FlightController {
  constructor(
    private readonly clientProxySuperFlights: ClientProxySuperFlights,
  ) {}

  private _clientProxyFlights =
    this.clientProxySuperFlights.clientProxyFlights();
  private _clientProxyPassengers =
    this.clientProxySuperFlights.clientProxyPassengers();

  @Post()
  create(@Body() flight: FlightDTO): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.CREATE, flight);
  }

  @Get()
  findAll(): Observable<IFlight[]> {
    return this._clientProxyFlights.send(FlightMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param() { id }: { id: string }): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.FIND_ONE, id);
  }

  @Put(':id')
  update(@Param() { id }: { id: string }, @Body() flight: FlightDTO) {
    return this._clientProxyFlights.send(FlightMSG.UPDATE, { id, flight });
  }

  @Delete(':id')
  delete(@Param() { id }: { id: string }): Observable<IFlight> {
    return this._clientProxyFlights.send(FlightMSG.DELETE, id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param()
    { flightId, passengerId }: { flightId: string; passengerId: string },
  ): Promise<Observable<IFlight>> {
    const passenger = await this._clientProxyPassengers
      .send(FlightMSG.FIND_ONE, passengerId)
      .toPromise();
    if (!passenger) {
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    }
    return this._clientProxyFlights.send(FlightMSG.ADD_PASSENGER, {
      flightId,
      passenger,
    });
  }
}
