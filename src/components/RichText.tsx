import { Fragment, useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

// Renders text where anything between $...$ is LaTeX maths.
// Use \$ for a literal dollar sign.
function RichText({ text }: { text: string }) {
  const parts = useMemo(() => {
    const segments = text.split(/(?<!\\)\$(.+?)(?<!\\)\$/g);
    return segments.map((segment, i) => {
      if (i % 2 === 0) return { math: false, value: segment.replace(/\\\$/g, "$") };
      return {
        math: true,
        value: katex.renderToString(segment, { throwOnError: false, output: "html" }),
      };
    });
  }, [text]);

  return (
    <>
      {parts.map((part, i) =>
        part.math ? (
          <span key={i} dangerouslySetInnerHTML={{ __html: part.value }} />
        ) : (
          <Fragment key={i}>{part.value}</Fragment>
        )
      )}
    </>
  );
}

export default RichText;
