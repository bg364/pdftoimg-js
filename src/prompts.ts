import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { PagesType } from "./types";
import { defaultOptions } from "./utils";
import {
  validateBackground,
  validateImgType,
  validateInput,
  validateIntent,
  validateMaxHeight,
  validateMaxWidth,
  validateNameTemplate,
  validateOutput,
  validatePages,
  validateScale,
  validateScaleForBrowserSupport,
} from "./validators";

export const argv = yargs(hideBin(process.argv))
  .scriptName("pdftoimg")
  .usage("Convert PDF pages to images (png/jpg)")
  .option("input", {
    alias: "i",
    type: "string",
    description: "Input PDF file path",
    demandOption: true,
  })
  .option("out", {
    alias: "o",
    type: "string",
    description: "Directory to save output images (default: current directory)",
  })
  .option("imgType", {
    alias: "t",
    type: "string",
    description: "Image type: png or jpg",
    default: String(defaultOptions.imgType),
  })
  .option("scale", {
    alias: "s",
    type: "string",
    description: "Scale factor (positive number)",
    default: String(defaultOptions.scale),
  })
  .option("pages", {
    alias: "p",
    type: "array",
    description:
      "Pages to convert: 'all', 'firstPage', 'lastPage', numbers or ranges like 1..3",
    default: String(defaultOptions.pages),
  })
  .option("name", {
    alias: "n",
    type: "string",
    description:
      "Naming template for output files (use {i} for index, {p} for page number, {ext} for extension, {f} for filename)",
  })
  .option("password", {
    alias: "ps",
    type: "string",
    description: "Password for the PDF file if encrypted",
  })
  .option("intent", {
    alias: "in",
    type: "string",
    description: "Rendering intent: 'display', 'print', or 'any'",
    default: "display",
  })
  .option("background", {
    alias: "b",
    type: "string",
    description:
      "Background color (e.g., 'white', 'rgba(255,255,255,0.5)', '#ffffff')",
    default: "rgb(255,255,255)",
  })
  .option("maxWidth", {
    alias: "mw",
    type: "string",
    description: "Maximum width for the rendered canvas",
    default: String(defaultOptions.maxWidth),
  })
  .option("maxHeight", {
    alias: "mh",
    type: "string",
    description: "Maximum height for the rendered canvas",
    default: String(defaultOptions.maxHeight),
  })
  .option("scaleForBrowserSupport", {
    alias: "sb",
    type: "string",
    description: "Scale for browser support",
    default: String(defaultOptions.scaleForBrowserSupport),
  })
  .parse();

export function validatePrompts(opts: Record<string, string>) {
  const inputPath = validateInput(opts.input);
  const outputPath = validateOutput(opts.out);
  const imgType = validateImgType(opts.imgType) as "jpg" | "png";
  const scale = validateScale(String(opts.scale));
  const pages = validatePages(String(opts.pages)) as PagesType;
  const intent = validateIntent(opts.intent || "display");
  const background = validateBackground(opts.background || "rgb(255,255,255)");
  const nameTemplate = validateNameTemplate(inputPath, opts.name);
  const maxWidth = validateMaxWidth(String(opts.maxWidth));
  const maxHeight = validateMaxHeight(String(opts.maxHeight));
  const scaleForBrowserSupport = validateScaleForBrowserSupport(
    String(opts.scaleForBrowserSupport),
  );

  return {
    inputPath,
    outputPath,
    imgType,
    scale,
    pages,
    nameTemplate,
    password: opts.password,
    intent,
    background,
    maxWidth,
    maxHeight,
    scaleForBrowserSupport,
  };
}
