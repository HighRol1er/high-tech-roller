import { useCallback, useRef } from 'react';
import { ErrToast } from '@/components/common';
import { uploadPostImage } from '@/lib/supabase/uploadimage';

export const useMarkdownEditor = (
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  setMarkdown: React.Dispatch<React.SetStateAction<string>>,
) => {
  const dragPositionRef = useRef<number>(0);

  // 개행용 event => \n 삽입
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter' || e.shiftKey) return;

    e.preventDefault();
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const currentLine = value.slice(lineStart, start);
    const insert = currentLine.trim() === '' || currentLine.endsWith('\\') ? '\n' : '\\\n';

    setMarkdown(value.slice(0, start) + insert + value.slice(end));

    requestAnimationFrame(() => {
      const newPos = start + insert.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  };

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
  }, []);

  // 3. Drag Over 핸들러 (캐럿 위치 계산 및 실시간 이동)
  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const textarea = textareaRef.current;
      if (!textarea) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyDoc = document as any;
      if (anyDoc.caretPositionFromPoint) {
        const pos = anyDoc.caretPositionFromPoint(e.clientX, e.clientY);
        dragPositionRef.current = pos.offset;
      } else if (document.caretRangeFromPoint) {
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        dragPositionRef.current = range?.startOffset || 0;
      }

      textarea.setSelectionRange(dragPositionRef.current, dragPositionRef.current);
      textarea.focus();
    },
    [textareaRef],
  );

  // 4. Drop 핸들러, supabase uploadimage
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
      if (files.length === 0) return;

      const textarea = textareaRef.current;
      if (!textarea) return;

      // 드롭된 순간의 위치를 고정합니다.
      const basePosition = dragPositionRef.current;
      let currentOffset = 0;

      // 여러 파일을 순차적으로 업로드합니다.
      for (const file of files) {
        try {
          // 1. Supabase 업로드 실행
          const publicUrl = await uploadPostImage(file);

          // 2. 마크다운 문구 생성
          const filename = file.name.replace(/\.[^.]+$/, '');
          const insertText = `\n![${filename}|300](${publicUrl})\n`;

          // 3. 텍스트 삽입 (함수형 업데이트로 순차 처리 보장)
          setMarkdown((prev) => {
            const before = prev.slice(0, basePosition + currentOffset);
            const after = prev.slice(basePosition + currentOffset);
            return before + insertText + after;
          });

          // 다음 이미지가 들어갈 위치를 계산합니다.
          currentOffset += insertText.length;
        } catch (error) {
          console.error('Image upload failed:', error);
          ErrToast(`${file.name} 업로드에 실패했습니다.`);
        }
      }

      setTimeout(() => {
        if (textarea) {
          const finalPos = basePosition + currentOffset;
          textarea.setSelectionRange(finalPos, finalPos);
          textarea.focus();
        }
      }, 50);
    },
    [setMarkdown, textareaRef],
  );

  return {
    handleKeyDown,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  };
};
