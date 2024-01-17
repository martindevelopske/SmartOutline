import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { createCousrseOutline } from "@/endpoints";
import axios from "axios";
import { User } from "lucide-react";

type Formvalues = {
  userID: User["id"] | undefined;
  Title: string;
  Description: string;
  Completed: boolean;
  hasTopics: boolean;
  user: User;
  topics: Topic[];
};
export default function CreateCoursePage() {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    JSON.parse(localStorage.getItem("user") as string)
  );

  const [defaultFields, setDefaultFields] = useState({
    Title: "",
    userID: currentUser?.id,
    Description: "",
    Completed: false,
    hasTopics: true,
    user: { currentUser },
    topics: [
      {
        TopicID: 1,
        CourseID: 1, // Adjust this according to your data structure
        Name: "",
        Description: "",
        Completed: false,
        hasSubTopics: false, // Adjust as needed
        course: {
          CourseID: 1, // Adjust as needed
        },
        subtopics: [], // Adjust as needed
      },
    ],
  });
  const navigate = useNavigate();
  const location = useLocation();
  //get user from local storage
  useEffect(() => {
    const userstring: string | null = localStorage.getItem("user");
    if (userstring) {
      const user = JSON.parse(userstring as string) as User;
      setCurrentUser(JSON.parse(userstring));
      //set the defaults
      // setDefaultFields((prevDefaultFields) => ({
      //   ...prevDefaultFields,
      //   userID: user.id,
      //   user: user,
      // }));
    } else {
      console.log("no user form local storage");
      navigate("/signin", { state: { from: location } });
    }
  }, []);

  const form = useForm<Formvalues>({
    defaultValues: defaultFields,
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    { name: "topics", control }
  );

  const { errors } = formState;

  const onError = (errors: FieldErrors<Formvalues>) => {
    console.log("form error", errors);
  };
  const onSubmit = async (data: Formvalues) => {
    try {
      console.log(defaultFields);

      console.log("form submitted");
      console.log(data);
      //make api call
      const res = await axios.post(createCousrseOutline, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="w-full flex items-center justify-center mt-20">
          Create New Course Outline
        </div>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-2 p-7 w-3/4"
          noValidate
        >
          <label>User ID</label>
          <input
            type="text"
            id="id"
            {...register("userID")}
            value={defaultFields.userID}
          ></input>
          <label>Title</label>
          <input
            type="text"
            id="title"
            {...register("Title", { required: "Username is required" })}
            className="border"
          ></input>
          <p className="text-red-500">{errors.Title?.message}</p>
          <label>Descrition</label>
          <textarea
            id="description"
            {...register("Description", {
              required: "Description is required",
            })}
            className="border"
          ></textarea>
          <p className="text-red-500">{errors.Description?.message}</p>
          <div className=" flex flex-col gap-3 items-center justify-center">
            <div className="text-2xl mb-5">Topics section</div>
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2 w-3/4">
                <label>Topic: {index}</label>
                <input
                  className="border rounded-md p-2 h-8"
                  type="text"
                  {...register(`topics.${index}.Name` as const, {
                    required: `Topic Name is required for topic ${index + 1}`,
                  })}
                  placeholder="Topic Name"
                />
                <textarea
                  className="border rounded-md p-2 h-32"
                  {...register(`topics.${index}.Description` as const, {
                    required: `Topic Description is required for topic ${
                      index + 1
                    }`,
                  })}
                  placeholder="Topic Description"
                />
                {/* <label>
                Completed
                <input
                  type="checkbox"
                  {...register(`topics.${index}.Completed` as const)}
                />
              </label> */}
                {index > 0 && (
                  <Button
                    variant="destructive"
                    type="button"
                    className="w-1/5"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
                <br></br>
                <Button
                  type="button"
                  className="mt-5 w-1/5"
                  onClick={() =>
                    append({
                      TopicID: 0, // Replace with the appropriate default value
                      CourseID: 0, // Replace with the appropriate default value
                      Name: "", // Replace with the appropriate default value
                      Description: "", // Replace with the appropriate default value
                      Completed: false,
                      hasSubTopics: false, // Replace with the appropriate default value
                      course: {
                        CourseID: 0, // Replace with the appropriate default value
                      },
                      subtopics: [], // You may initialize subtopics with default values if needed
                    })
                  }
                >
                  Add Topic
                </Button>
              </div>
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
}
