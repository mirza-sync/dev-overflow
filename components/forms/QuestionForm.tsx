"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldLabel, FieldError, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {};

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleCreateQuestion)}>
        <Controller
          key="title"
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="paragraph-medium text-dark400_light800"
              >
                Question Title <span className="text-primary-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                aria-invalid={fieldState.invalid}
                className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you’re asking a question to another
                person.
              </FieldDescription>
            </Field>
          )}
        />

        <Controller
          key="content"
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="paragraph-medium text-dark400_light800"
              >
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FieldLabel>
              {/* Editor */}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you put in the title.
              </FieldDescription>
            </Field>
          )}
        />

        <Controller
          key="tags"
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor={field.name}
                className="paragraph-medium text-dark400_light800"
              >
                Tags <span className="text-primary-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Add tags..."
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Be specific and imagine you’re asking a question to another
                person.
              </FieldDescription>
            </Field>
          )}
        />
      </form>
    </div>
  );
};

export default QuestionForm;
