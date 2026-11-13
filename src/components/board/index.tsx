import { useCallback, useLayoutEffect, useRef } from "react";
import BoardHeading from "./_BoardHeading";
import Card from "./_Card";
import { QuestionType } from "./data";
import { useSetModalData } from "../../modalUtils";

// Category headings share one font size: the largest (up to MAX) at which every
// heading's longest word still fits inside its column, so none spill into a neighbour.
const HEADING_MAX_PX = 24;
const HEADING_MIN_PX = 10;

function fitHeadings(headings: HTMLElement[]) {
  const fitsAt = (px: number) => {
    headings.forEach((h) => (h.style.fontSize = `${px}px`));
    return headings.every((h) => h.scrollWidth <= h.clientWidth + 1);
  };
  let size = HEADING_MAX_PX;
  while (size > HEADING_MIN_PX && !fitsAt(size)) size -= 0.5;
  fitsAt(size);
}

function Board({
  categories,
  questions,
}: {
  categories: string[];
  questions: QuestionType[][];
}) {
  const setModalQuestion = useSetModalData();
  const boardRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (i: number, j: number) => {
      const questionData = questions[i][j];
      if (questionData) {
        // Rows are point values and columns are categories, so j picks the category.
        setModalQuestion(questionData, categories[j]);
      }
    },
    [questions, categories, setModalQuestion]
  );

  useLayoutEffect(() => {
    const board = boardRef.current;
    if (!board) return;
    const headings = [...board.querySelectorAll<HTMLElement>("h2")];
    const refit = () => fitHeadings(headings);
    refit();
    // The heading font (Anton) loads from the web and can change widths once it arrives.
    document.fonts?.ready.then(refit);
    window.addEventListener("resize", refit);
    return () => window.removeEventListener("resize", refit);
  }, [categories]);

  return (
    <div
      ref={boardRef}
      className="grid gap-4 bg-black-200 rounded-lg overflow-hidden flex-grow min-h-0 p-5 text-2xl text-white mx-[max(1rem,10vw)]"
      style={{
        gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))`,
        gridTemplateRows: `auto repeat(${questions.length}, minmax(0, 1fr))`,
      }}
    >
      {categories.map((cat) => (
        <BoardHeading key={cat}>{cat}</BoardHeading>
      ))}
      {questions.map((row, i) =>
        row.map((q, j) => (
          <Card
            key={`${i}-${j}`}
            points={q ? `${q.points}` : ""}
            i={i}
            j={j}
            onClick={handleClick}
          />
        ))
      )}
    </div>
  );
}

export default Board;
