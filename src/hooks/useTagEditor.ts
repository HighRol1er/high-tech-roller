import { useState, useCallback } from 'react';

export const useTagEditor = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && tagInput.trim() !== '') {
        e.preventDefault();
        const trimmedInput = tagInput.trim();

        if (!tags.includes(trimmedInput)) {
          setTags((prev) => [...prev, trimmedInput]);
        }
        setTagInput('');
      }
    },
    [tagInput, tags],
  );

  const removeTag = useCallback((index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    tags,
    tagInput,
    setTagInput,
    handleTagKeyDown,
    removeTag,
    setTags,
  };
};
