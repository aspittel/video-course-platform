import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Video {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly courseID: string;
  constructor(init: ModelInit<Video>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video>) => MutableModel<Video> | void): Video;
}

export declare class Course {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly videos?: (Video | null)[];
  constructor(init: ModelInit<Course>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course>) => MutableModel<Course> | void): Course;
}