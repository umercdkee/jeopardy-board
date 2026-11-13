import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import {
  useCloseModal,
  useModalData,
  usePopupFontSize,
  useSetPopupFontSize,
} from "../modalUtils";
import type { QuestionType } from "./board/data";
import RichText from "./RichText";

const LETTERS = ["A", "B", "C", "D"] as const;

// Every size inside a popup is in em, so the popup's font size scales everything together.
// 16px is the normal size. On smaller screens SizeProbe lowers it for all questions at once.
const MAX_FONT_PX = 16;
const MIN_FONT_PX = 6;

// Code blocks are the only part allowed to differ between questions: they start at
// CODE_MAX_EM (the same size as the options) and shrink, never below CODE_MIN_EM,
// when a question has little room.
const CODE_MAX_EM = 1.875;
const CODE_MIN_EM = 1.1;

// A question with both code and options can show them stacked (code above options) or
// beside each other (code left, options right). The layout is set on the element marked
// data-code-pair by trying both and keeping whichever lets the code be largest.
const LAYOUTS = ["beside", "stacked"] as const;

const buttonClass =
  "w-[12em] bg-blue-600 text-white rounded-full py-[0.75em] mt-[2em] border-none cursor-pointer text-[1em] font-medium tracking-widest hover:bg-blue-700 transition-colors";

type PopupQuestion = QuestionType & { category: string };

type CardProps = {
  data: PopupQuestion;
  showAnswer: boolean;
  onShowAnswer?: () => void;
  onClose?: () => void;
  fontSize?: number;
  codeEm?: number;
};

// True when the card's content spills outside the card (or a code block outside itself).
function overflows(box: HTMLElement) {
  return (
    box.scrollHeight > box.clientHeight + 1 ||
    box.scrollWidth > box.clientWidth + 1 ||
    [...box.querySelectorAll("pre")].some((pre) => pre.scrollWidth > pre.clientWidth + 1)
  );
}

// Whether the card fits in at least one layout; leaves the card in the first one that fits.
function fitsInSomeLayout(card: HTMLElement) {
  const pair = card.querySelector<HTMLElement>("[data-code-pair]");
  if (!pair) return !overflows(card);
  return LAYOUTS.some((layout) => {
    pair.dataset.layout = layout;
    return !overflows(card);
  });
}

// Binary search for the largest value in [lo, hi] for which fits(value) is true.
function largestFitting(lo: number, hi: number, step: number, fits: (v: number) => boolean) {
  if (fits(hi)) return hi;
  while (hi - lo > step) {
    const mid = (lo + hi) / 2;
    if (fits(mid)) lo = mid;
    else hi = mid;
  }
  return lo;
}

const QuestionCard = forwardRef<HTMLDivElement, CardProps>(function QuestionCard(
  { data, showAnswer, onShowAnswer, onClose, fontSize, codeEm = CODE_MAX_EM },
  ref
) {
  const { category, points, question, code, options, answer } = data;
  const answerIndex = options ? LETTERS.indexOf(answer as (typeof LETTERS)[number]) : -1;

  const optionList = options && (
    <ol className="mx-auto mt-[0.8em] group-data-[layout=beside]:mx-0 group-data-[layout=beside]:mt-0 grid w-fit gap-[0.4em] text-left text-[1.875em] font-light">
      {options.map((option, i) => {
        const dimmed = showAnswer && i !== answerIndex;
        const correct = showAnswer && i === answerIndex;
        return (
          <li
            key={LETTERS[i]}
            className={`flex items-baseline gap-[0.53em] rounded-xl px-[0.66em] py-[0.25em] transition-colors ${
              correct ? "bg-green-600" : ""
            } ${dimmed ? "opacity-40" : ""}`}
          >
            <span className="font-semibold text-yellow-200">{LETTERS[i]})</span>
            <span>
              <RichText text={option} />
            </span>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div
      ref={ref}
      style={fontSize ? { fontSize } : undefined}
      className="flex flex-col bg-black-100 rounded-3xl text-center w-11/12 max-w-7xl max-h-[90vh] overflow-hidden shadow-2xl text-white font-sans"
    >
      <div className="shrink-0 flex items-center justify-between gap-[0.75em] bg-black-200 px-[1.33em] py-[0.5em] font-anton text-[1.875em] tracking-wide text-yellow-200">
        <span className="text-left">{category}</span>
        <span className="shrink-0 rounded-full bg-blue-200 px-[0.66em] py-[0.1em] text-white">
          {points} points
        </span>
      </div>

      <div className="shrink-0 px-[2.5em] pt-[1.25em] pb-[2.5em]">
        <p className="my-[0.5em] text-[2.25em] font-light leading-relaxed tracking-wide">
          <RichText text={question} />
        </p>

        {code ? (
          // Code and options share a box whose layout (stacked or beside) is picked at runtime.
          <div
            data-code-pair={options ? "" : undefined}
            className="group flex flex-col items-center data-[layout=beside]:flex-row data-[layout=beside]:justify-center data-[layout=beside]:gap-[2.5em]"
          >
            <pre
              style={{ fontSize: `${codeEm}em` }}
              className="my-[0.66em] w-fit max-w-full min-w-0 overflow-hidden rounded-xl bg-black-200 px-[1.33em] py-[0.8em] text-left font-mono leading-relaxed"
            >
              {code}
            </pre>
            {optionList}
          </div>
        ) : (
          optionList
        )}

        {!options && (
          // Always laid out (just hidden until revealed) so nothing moves or resizes on reveal.
          <p
            className={`mt-[0.9em] text-[2.25em] font-semibold text-green-400 ${showAnswer ? "" : "invisible"}`}
          >
            <RichText text={answer} />
          </p>
        )}

        {showAnswer ? (
          <button onClick={onClose} className={buttonClass}>
            Close
          </button>
        ) : (
          <button onClick={onShowAnswer} className={buttonClass}>
            Show Answer
          </button>
        )}
      </div>
    </div>
  );
});

const Modal = () => {
  const closeModal = useCloseModal();
  const modalData = useModalData();

  if (!modalData) return null;

  // The key gives every question its own popup, so "Show Answer" always starts hidden.
  return (
    <QuestionPopup
      key={`${modalData.category}-${modalData.points}`}
      data={modalData}
      onClose={closeModal}
    />
  );
};

function QuestionPopup({ data, onClose }: { data: PopupQuestion; onClose: () => void }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const fontSize = usePopupFontSize();
  const boxRef = useRef<HTMLDivElement>(null);

  // Text size is shared by all questions; only the code block shrinks to make room.
  useLayoutEffect(() => {
    const box = boxRef.current;
    const pre = box?.querySelector("pre");
    if (!box || !pre) return;
    const pair = box.querySelector<HTMLElement>("[data-code-pair]");
    const fitCode = () => {
      const fitsAt = (em: number) => {
        pre.style.fontSize = `${em}em`;
        return !overflows(box);
      };
      // For each layout, find the largest code size that fits; keep the layout that wins.
      let best = { layout: "stacked" as (typeof LAYOUTS)[number], em: CODE_MIN_EM, fits: false };
      for (const layout of pair ? LAYOUTS : (["stacked"] as const)) {
        if (pair) pair.dataset.layout = layout;
        if (!fitsAt(CODE_MIN_EM)) continue;
        const em = largestFitting(CODE_MIN_EM, CODE_MAX_EM, 0.02, fitsAt);
        if (!best.fits || em > best.em) best = { layout, em, fits: true };
      }
      if (pair) pair.dataset.layout = best.layout;
      pre.style.fontSize = `${best.em}em`;
    };
    fitCode();
    window.addEventListener("resize", fitCode);
    return () => window.removeEventListener("resize", fitCode);
  }, [data, showAnswer, fontSize]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-5 box-border">
      <QuestionCard
        ref={boxRef}
        data={data}
        showAnswer={showAnswer}
        onShowAnswer={() => setShowAnswer(true)}
        onClose={onClose}
        fontSize={fontSize}
      />
    </div>
  );
}

// Invisibly renders every question with its answer showing (the tallest state) and its
// code at the smallest allowed size, then finds the largest font size at which all of
// them fit on this screen. Re-measures when the window is resized.
export function SizeProbe({ questions }: { questions: PopupQuestion[] }) {
  const setFontSize = useSetPopupFontSize();
  const probeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const probe = probeRef.current;
    if (!probe) return;
    const cards = [...probe.querySelectorAll<HTMLElement>("[data-card]")].map(
      (wrapper) => wrapper.firstElementChild as HTMLElement
    );

    const measure = () => {
      const size = largestFitting(MIN_FONT_PX, MAX_FONT_PX, 0.1, (px) => {
        cards.forEach((card) => (card.style.fontSize = `${px}px`));
        return cards.every(fitsInSomeLayout);
      });
      setFontSize(Math.floor(size * 10) / 10);
    };

    let frame = 0;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    // Web fonts can finish loading after the first measurement and change text sizes.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [questions, setFontSize]);

  return (
    <div ref={probeRef} aria-hidden className="fixed inset-0 invisible pointer-events-none -z-10">
      {questions.map((q, i) => (
        <div
          key={i}
          data-card
          className="absolute inset-0 flex justify-center items-center p-5 box-border"
        >
          <QuestionCard data={q} showAnswer codeEm={CODE_MIN_EM} />
        </div>
      ))}
    </div>
  );
}

export default Modal;
