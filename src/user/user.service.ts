import { Injectable } from '@nestjs/common';

import {DatabaseService} from "@shared/database/services/database.service";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import * as process from "process";

@Injectable()
export class UserService extends DatabaseService{
  constructor(@InjectDataSource() datasource: DataSource) {
    super(datasource)
  }
}
