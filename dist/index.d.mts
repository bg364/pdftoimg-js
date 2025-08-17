import { DocumentInitParameters, TypedArray } from 'pdfjs-dist/types/src/display/api';

type DocumentParams = Omit<DocumentInitParameters, "data" | "url">;
type PagesType = {
    startPage?: number;
    endPage?: number;
} | "firstPage" | "lastPage" | "all" | number | number[];
interface Options {
    /**
     * The type of image to output. Can be 'png' or 'jpg'. The default value is 'png'.
     */
    imgType?: "png" | "jpg";
    /**
     * The scale of the rendered image. The default value is 1.
     */
    scale?: number;
    /**
     * Background to use for the canvas. Any valid canvas.fillStyle can be used:
     * a DOMString parsed as CSS value, a CanvasGradient object (a linear or radial gradient)
     * or a CanvasPattern object (a repetitive image).
     * The default value is 'rgb(255,255,255)'.
     */
    background?: string | CanvasGradient | CanvasPattern | undefined;
    /**
     * Rendering intent, can be 'display', 'print', or 'any'. The default value is 'display'.
     */
    intent?: "display" | "print" | "any";
    /**
     * Specifies which pages to render from the PDF document. Can be:
     * - A single page number (e.g. 1)
     * - A page range object with optional startPage and endPage (e.g. {startPage: 1, endPage: 3})
     * - "firstPage" to render only the first page
     * - "lastPage" to render only the last page
     * - "all" to render all pages
     * - An array of specific page numbers (e.g. [1, 3, 5])
     * @default "all"
     */
    pages?: PagesType;
    /**
     * Additional document options.
     */
    documentOptions?: DocumentParams;
    /**
     * Maximum width (in pixels) for the rendered canvas.
     * If the rendered canvas would exceed this, it will be downscaled proportionally.
     * @default null
     */
    maxWidth?: number | null;
    /**
     * Maximum height (in pixels) for the rendered canvas.
     * If the rendered canvas would exceed this, it will be downscaled proportionally.
     * @default null
     */
    maxHeight?: number | null;
    /**
     * Automatically downscale large PDF pages to avoid browser canvas size limitations.
     * Ensures consistent rendering across browsers like Safari with stricter limits.
     * Uses default max dimensions of 4096x4096 pixels unless overridden by maxWidth/maxHeight.
     * @default false
     */
    scaleForBrowserSupport?: boolean;
}
type PerSrcReturn<O extends Options> = O["pages"] extends number | "firstPage" | "lastPage" ? string : string[];
type PdfSrc = string | URL | TypedArray;
type ReturnType<O extends Options, S extends PdfSrc | PdfSrc[]> = S extends PdfSrc[] ? PerSrcReturn<O>[] : PerSrcReturn<O>;

declare function pdfToImg<O extends Options, S extends PdfSrc | PdfSrc[]>(src: S, options?: O): Promise<ReturnType<O, S>>;
declare function singlePdfToImg(src: PdfSrc, opt?: Partial<Options>): Promise<string | Buffer<ArrayBufferLike> | (string | Buffer<ArrayBufferLike>)[]>;

export { pdfToImg, singlePdfToImg };
