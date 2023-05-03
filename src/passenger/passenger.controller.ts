import { Controller } from '@nestjs/common';
import config from 'src/config';

const { apiVersion } = config;

@Controller(`${apiVersion}/passenger`)
export class PassengerController {}
