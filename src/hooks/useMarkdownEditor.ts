import { useCallback, useRef } from 'react';

export const useMarkdownEditor = (
  // 1. 외부에서 정의한 ref를 인자로 받습니다.
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  setMarkdown: React.Dispatch<React.SetStateAction<string>>,
) => {
  const dragPositionRef = useRef<number>(0);

  // 1. Enter 키 핸들러 (개행 시 \ 자동 삽입)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== 'Enter' || e.shiftKey) return;

      e.preventDefault();
      // 인자로 받은 ref의 current를 참조합니다.
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
    },
    [setMarkdown, textareaRef],
  );

  // 2. Drag Leave 핸들러
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

  // 4. Drop 핸들러 (이미지 마크다운 삽입)
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
      if (files.length === 0) return;

      const textarea = textareaRef.current;
      if (!textarea) return;
      const position = dragPositionRef.current;

      let insertText = '';
      files.forEach((file) => {
        const objectUrl = URL.createObjectURL(file);
        const filename = file.name.replace(/\.[^.]+$/, '');
        insertText += `\n![${filename}|300](${objectUrl})\n`;
      });

      setMarkdown((prev) => prev.slice(0, position) + insertText + prev.slice(position));

      setTimeout(() => {
        if (textarea) {
          const newPos = position + insertText.length;
          textarea.setSelectionRange(newPos, newPos);
          textarea.focus();
        }
      }, 0);
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
