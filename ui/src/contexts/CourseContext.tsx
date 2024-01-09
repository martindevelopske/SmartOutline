// CourseContext.js

import { ReactNode, createContext, useContext, useState } from "react";

const CourseContext = createContext({});

export const useCourseContext = () => useContext(CourseContext);

const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    completed: false,
    user: {
      id: "",
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      accessToken: "",
      refreshToken: "",
      courses: [],
      createdAt: "",
    },
    topics: [
      {
        name: "",
        description: "",
        completed: false,
        subtopics: [
          {
            name: "",
            description: "",
            completed: false,
            parentSubtopicId: null,
            nestedSubtopics: [
              {
                name: "",
                description: "",
                completed: false,
                parentSubtopicId: null,
              },
            ],
          },
        ],
      },
    ],
  });

  const updateCourseData = (newData: any) => {
    setCourseData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <CourseContext.Provider value={{ courseData, updateCourseData }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseProvider;
