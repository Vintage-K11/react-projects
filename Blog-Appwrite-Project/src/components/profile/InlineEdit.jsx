import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import Textarea from '@/components/common/Textarea';

const InlineEdit = ({
  value,
  onSave,
  isOwner,
  fieldName,
  as: Component = 'p', // Render as <p>, <h1>, etc.
  className = '',
  editComponent: EditComponent = Input, // Use Input or Textarea
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm({ defaultValues: { [fieldName]: value } });

  useEffect(() => {
    reset({ [fieldName]: value });
  }, [value, reset, fieldName]);

  const handleSave = (data) => {
    onSave(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({ [fieldName]: value });
  };

  if (!isOwner) {
    return <Component className={className}>{value || '...'}</Component>;
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(handleSave)} className="flex items-center gap-2">
        <EditComponent
          {...register(fieldName)}
          autoFocus
          className="flex-grow"
          {...props}
        />
        <Button type="submit" size="sm">Save</Button>
        <Button type="button" variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
      </form>
    );
  }

  return (
    <div className="group relative flex items-center -ml-8 pl-8">
      <Component className={className}>{value || 'Click to edit...'}</Component>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => setIsEditing(true)}
      >
        ✏️
      </Button>
    </div>
  );
};

export default InlineEdit;