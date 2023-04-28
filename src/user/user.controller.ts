import { Controller } from '@nestjs/common';
config
const { apiVersion } = config;

@Controller(`${apiVersion}/user`)
export class UserController {}
