type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type User = {
  email: string;
  firstname: string;
  lastname: string;
  password?: string;
  accessToken?: string;
  refreshToken?: string;
  id: string;
  createdAt?: DateTime;
};
type Topic = {
  TopicID: number;
  CourseID: number;
  Name: string;
  Description: string;
  Completed: boolean;
  hasSubTopics: boolean;
  course: {
    CourseID: number;
    // Include other fields from the Course model if needed
  };
  subtopics: Subtopic[];
};

type Subtopic = {
  SubtopicID: number;
  TopicID: number;
  Name: string;
  Description: string;
  Completed: boolean;
  ParentSubtopicID?: number | null;
  hasNestedSubtopics: boolean;
  nestedSubtopics: NestedSubtopic[];
};

type NestedSubtopic = {
  SubtopicID: number;
  ParentSubtopicID?: number | null;
  Name: string;
  Description: string;
  Completed: boolean;
};
