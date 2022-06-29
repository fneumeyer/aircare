
import feathers from '@feathersjs/client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import { Service as MongooseService } from 'feathers-mongoose';
import {IUser} from 'backend/src/models/users.model'
import {IEngine} from 'backend/src/models/engines.model'
import {ITask} from 'backend/src/models/tasks.model'

const socket = io('http://localhost:3000')

interface ServiceTypes {
  'users': MongooseService<IUser>;
  'engines': MongooseService<IEngine>;
  'tasks': MongooseService<ITask>;
}

const client = feathers<ServiceTypes>()

client.configure(socketio(socket))

client.configure(auth())

export default client