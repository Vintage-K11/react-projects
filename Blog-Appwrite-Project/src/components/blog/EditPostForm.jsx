// src/components/blog/EditPostForm.jsx
import { useForm, Controller } from "react-hook-form";
import Input from "../common/Input";
import Label from "../common/Label";
import { Button } from "../common/Button";
import RTE from "../common/RTE";

const EditPostForm = ({ post, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      image: post?.image || "",
      content: post?.content || "",
    },
  });

  const submitHandler = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 max-w-3xl mx-auto"
    >
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input
          id="excerpt"
          placeholder="Short summary"
          {...register("excerpt", { required: "Excerpt is required" })}
        />
        {errors.excerpt && (
          <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" placeholder="https://example.com/image.jpg" {...register("image")} />
      </div>

      {/* Content (RTE) */}
      <div>
        <RTE name="content" control={control} label="Content" defaultValue={post?.content} />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit">Update Post</Button>
      </div>
    </form>
  );
};

export default EditPostForm;
