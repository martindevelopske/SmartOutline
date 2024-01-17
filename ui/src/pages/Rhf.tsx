import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button } from "@/components/ui/button";
type Formvalues = {
  username: string;
  email: string;
  socials: {
    twitter: string;
    linkedin: string;
  };
  numbers: string[];
  phNums: {
    num: string;
  }[];
  age: number;
};
export default function RHF() {
  const form = useForm<Formvalues>({
    defaultValues: {
      username: "Batman",
      email: "",
      socials: {
        twitter: "",
        linkedin: "",
      },
      numbers: ["", ""],
      phNums: [{ num: "" }],
      age: 0,
    },
  });
  const { register, control, handleSubmit, formState, watch, getValues } = form;
  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitSuccessful,
    isSubmitting,
    isSubmitted,
  } = formState;

  console.log(isSubmitting);
  console.log(isSubmitted, "is submitedd");

  const { fields, append, remove } = useFieldArray({
    name: "phNums",
    control,
  });

  const onSubmit = (data: Formvalues) => {
    console.log("form submitted");
    console.log(data);
  };

  const watchUsername = watch("username");
  const onError = (errors: FieldErrors<Formvalues>) => {
    console.log("form error", errors);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-2 p-3 w-3/4"
        noValidate
      >
        <label>name</label>
        <input
          type="text"
          id="username"
          {...register("username", { required: "Username is required" })}
          className="border"
        ></input>
        <p className="text-red-500">{errors.username?.message}</p>
        <label>Email</label>
        <input
          type="text"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "invalid email format",
            },
            validate: {
              admmin: (fieldValue) => {
                return (
                  fieldValue != "admin@example.com" ||
                  "Enter a diffrent email address"
                );
              },
              notDev: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") || "Domain not allowed"
                );
              },
            },
          })}
          className="border"
        ></input>
        <p className="text-red-500">{errors.email?.message}</p>
        <label>twitter</label>
        <input
          type="text"
          id="username"
          {...register("socials.twitter", { required: "twitter is required" })}
          className="border"
        ></input>
        <p className="text-red-500">{errors.socials?.twitter?.message}</p>
        <label>linkedin</label>
        <input
          type="text"
          id="username"
          {...register("socials.linkedin", {
            required: "linkedin is required",
          })}
          className="border"
        ></input>
        <p className="text-red-500">{errors.socials?.linkedin?.message}</p>
        <label>Primary cel</label>
        <input
          type="text"
          id="number"
          {...register("numbers.0")}
          className="border"
        ></input>
        <label>Secondary cel</label>
        <input
          type="text"
          id="number"
          {...register("numbers.1")}
          className="border"
        ></input>
        <div>
          <label>List of numbers</label>
          <div>
            {fields.map((field, index) => (
              <div key={field.id}>
                <label>id: {index}</label>
                <input
                  className=" border"
                  type="text"
                  {...register(`phNums.${index}.number` as const)}
                />
                {index > 0 && (
                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={() => append({ num: "" })}>
              Add phone number
            </Button>
          </div>
        </div>
        <label>age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
          })}
          className="border"
        ></input>

        {/* <p>{watchUsername}</p> */}
        {/* <Button type="button" onClick={() => console.log(getValues())}>
          Get Values
        </Button> */}
        <Button type="submit" disabled={!isDirty || !isValid}>
          Submit
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
}
