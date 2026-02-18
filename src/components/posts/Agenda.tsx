import type { Heading } from "@/shared/lib/markdown-utils";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

interface AgendaProps {
  headings: Heading[];
}

export const Agenda = ({ headings }: AgendaProps) => {
  useEffect(() => {
    // 헤딩에 ID 추가
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (!element) {
        // 헤딩 요소 찾기 (ReactMarkdown이 렌더링한 후)
        const allHeadings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
        allHeadings.forEach((h) => {
          if (h.textContent?.trim() === heading.text) {
            h.id = heading.id;
          }
        });
      }
    });
  }, [headings]);

  // const handleClick = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 1. 요소의 절대 위치(y)를 구합니다.
      const elementPosition = element.getBoundingClientRect().top;
      // 2. 현재 스크롤 위치와 합치고 헤더 높이(64px)를 뺍니다.
      const offsetPosition = elementPosition + window.pageYOffset - 64;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-29 h-fit max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="bg-transparent rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3 text-foreground">Agenda</h3>
        <Separator className="bg-primary" />
        <div className="pb-6"></div>
        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleClick(heading.id);
              }}
              className={`block text-sm hover:text-primary transition-colors ${
                heading.level === 1
                  ? "font-semibold"
                  : heading.level === 2
                    ? "font-medium pl-2"
                    : "pl-4 text-muted-foreground"
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
