import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';

interface EngineData{
  _id?: string;
  identifier: string;
  name?: string;
}

export class Engines extends Service<EngineData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
}
