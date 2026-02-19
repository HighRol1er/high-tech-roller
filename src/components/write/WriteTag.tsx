import type { SetState } from '@/types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface WriteTagProps {
  tagInput: string;
  setTagInput: SetState<string>;
  tags: string[];
  handleTagKeyDown: (e: React.KeyboardEvent<Element>) => void;
  removeTag: (index: number) => void;
}
export function WriteTag({ tagInput, tags, setTagInput, handleTagKeyDown, removeTag }: WriteTagProps) {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      {tags.map((tag, index) => (
        <Badge key={index} variant='secondary' className='px-3 py-1 text-sm gap-1 flex items-center'>
          {tag}
          <button type='button' onClick={() => removeTag(index)} className='hover:text-destructive'>
            <X className='w-3 h-3 cursor-pointer' />
          </button>
        </Badge>
      ))}
      <input
        type='text'
        placeholder='태그를 입력하세요 (Enter)'
        className='flex-1 min-w-50 bg-transparent outline-none text-lg text-muted-foreground'
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleTagKeyDown}
      />
    </div>
  );
}
