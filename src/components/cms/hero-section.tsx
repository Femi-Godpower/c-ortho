import type { ReactNode } from "react";

import type { CmsComponentRenderProps } from "@ominity/next/cms/rendering";

import type { CmsRenderContext as StarterRenderContext } from "@ominity/next/cms";

import { asString } from "./helpers";

const ROBOTO_BOLD_UPPER_WIDTHS: Record<string, number> = {
  A: 0.70, B: 0.68, C: 0.72, D: 0.72, E: 0.63, F: 0.58, G: 0.77, H: 0.72,
  I: 0.30, J: 0.49, K: 0.68, L: 0.58, M: 0.83, N: 0.72, O: 0.77, P: 0.68,
  Q: 0.77, R: 0.68, S: 0.63, T: 0.60, U: 0.72, V: 0.70, W: 0.94, X: 0.68,
  Y: 0.68, Z: 0.63,
  '0': 0.60, '1': 0.60, '2': 0.60, '3': 0.60, '4': 0.60, '5': 0.60,
  '6': 0.60, '7': 0.60, '8': 0.60, '9': 0.60,
  '-': 0.38, '&': 0.72
};

function getWordWidthEm(word: string): number {
  let width = 0;
  const upper = word.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const char = upper[i];
    if (char !== undefined) {
      width += ROBOTO_BOLD_UPPER_WIDTHS[char] ?? 0.65;
    }
  }
  return width;
}

export function HeroSection({
  component,
  renderer,
}: CmsComponentRenderProps<StarterRenderContext>) {
  const title = asString(component.fields.title, "");
  const subtitle = asString(component.fields.subtitle, "");
  const image = asString(component.fields.image, "");

  const words = title.split(/\s+/).filter(Boolean);
  const maxWordWidthEm = Math.max(...words.map((w) => getWordWidthEm(w)), 1);
  const fontSizeStyle = `clamp(2.5rem, calc(105cqw / ${maxWordWidthEm}), 12rem)`;

  return (
    <section className="">
      <div className="@container w-1/2 h-[calc(100vh-11rem)] flex flex-col justify-center">
        <h1
          className="text-right text-como-950 font-bold font-roboto uppercase leading-none whitespace-pre-line"
          style={{ fontSize: fontSizeStyle }}
        >
          {title.replace(/\s+/g, "\n")}
        </h1>
        {subtitle ? (
          <p className="text-base text-muted-foreground md:text-lg">{subtitle}</p>
        ) : null}
      </div>

      {image ? <img src={image} alt={title} className="mt-8" /> : null}
    </section>
  );
}

