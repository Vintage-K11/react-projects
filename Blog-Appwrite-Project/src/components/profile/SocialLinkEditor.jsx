import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { X, Edit2 } from 'lucide-react';

const SocialLinkEditor = ({
  isOwner,
  platform,
  username,
  icon: Icon,
  onSave,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { link: username || '' },
  });

  const handleSave = (data) => {
    onSave(platform, data.link);
    setIsOpen(false);
  };

  const platformUrl = {
    twitter: 'https://twitter.com/',
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/in/',
    youtube: 'https://youtube.com/',
    instagram: 'https://instagram.com/',
    medium: 'https://medium.com/@',
  };

  const fullUrl = username ? `${platformUrl[platform] || ''}${username}` : null;

  if (!isOwner) {
    if (!fullUrl) {
      return (
        <span className="p-2 text-gray-400 dark:text-gray-600 cursor-not-allowed">
          <Icon className="w-6 h-6" />
        </span>
      );
    }
    return (
      <a
        href={fullUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
      >
        <Icon className="w-6 h-6" />
      </a>
    );
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="relative group p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
          <Icon className="w-6 h-6" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition-all">
            <Edit2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100" />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
            Edit {platform.charAt(0).toUpperCase() + platform.slice(1)} Link
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your {platform} username.
          </Dialog.Description>
          <form onSubmit={handleSubmit(handleSave)} className="mt-4 space-y-4">
            <Input {...register('link')} placeholder="Your username" />
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </Dialog.Close>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SocialLinkEditor;