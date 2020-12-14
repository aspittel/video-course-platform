// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Video, Course } = initSchema(schema);

export {
  Video,
  Course
};