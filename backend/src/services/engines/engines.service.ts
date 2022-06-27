// Initializes the `engines` service on path `/engines`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Engines } from './engines.class';
import createModel from '../../models/engines.model';
import hooks from './engines.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'engines': Engines & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/engines', new Engines(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('engines');

  service.hooks(hooks);
}
