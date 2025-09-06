// src/components/blog/CreatePostForm.jsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import RTE from "../common/RTE"; // your RTE component
import { Card, CardHeader, CardTitle, CardContent } from "../common/Card";

const CreatePostForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
    },
  });

  // Auto-generate slug from title
  const handleSlug = (title) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Create New Post
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit((data) => {
            if (!data.slug) {
              data.slug = handleSlug(data.title);
            }
            onSubmit?.(data);
          })}
          className="space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-1">Title</label>
            <Input
              placeholder="Enter post title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-1">Slug (optional)</label>
            <Input
              placeholder="Auto-generated from title if left blank"
              {...register("slug")}
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block mb-1">Excerpt</label>
            <Input
              placeholder="Short description of the post"
              {...register("excerpt", {
                required: "Excerpt is required",
                maxLength: {
                  value: 200,
                  message: "Excerpt must be under 200 characters",
                },
              })}
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="block mb-1">Cover Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              {...register("coverImage")}
            />
          </div>

          {/* Content (RTE) */}
          <div>
            <RTE name="content" control={control} label="Content" />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Publish Post
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
