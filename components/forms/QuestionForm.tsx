"use client";

import { AskQuestionSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Field, FieldLabel, FieldError, FieldDescription } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";
import Editor from "../editor";
import TagCard from "../cards/TagCard";

//====================================
// Below dynamic import was from MDXEditor docs...
// MDX Editor doesn't work with SSR, so we need to dynamically import it.
// However, since we're already in a client component, we can directly import it without dynamic import.
// ----------------------------------
// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import("@/components/editor/index"), {
//   ssr: false,
// });
//====================================

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleAddTag = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length >= 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag must be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", { type: "manual", message: "Tag already added" });
      }
    }
  };

  const handleCreateQuestion = (data: z.infer<typeof AskQuestionSchema>) => {};

  return (
    <div>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
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
              <Editor
                editorRef={editorRef}
                markdown={field.value}
                onChange={field.onChange}
              />
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
                  id={field.name}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Add tags..."
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 border"
                  onKeyDown={(e) => handleAddTag(e, field)}
                />
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.value.map((tag) => (
                      <TagCard key={tag} id={tag} name={tag} />
                    ))}
                  </div>
                )}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Add up to 5 tags to describe what your question is about. You
                need to press enter to add a tag.
              </FieldDescription>
            </Field>
          )}
        />

        <div className="mt-16 flex justify-end">
          <Button
            type="submit"
            className="primary-gradient text-light-900 h-10 w-fit"
          >
            Ask A Question
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
