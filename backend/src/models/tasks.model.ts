// tasks-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose, Types } from 'mongoose';

export type TaskState = 'notInProgress' | 'inProgress' | 'done'

export interface ITask {
  title: string;
  description: string;
  engine: Types.ObjectId;
  taskState: TaskState;
}

export default function (app: Application): Model<ITask> {
  const modelName = 'tasks';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const defaultTaskState: TaskState = 'notInProgress';

  const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    engine: { 
      type: Schema.Types.ObjectId, 
      ref: 'engines', 
      required: true 
    },
    taskState: { type: String, default: defaultTaskState}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<ITask>(modelName, schema);
}
