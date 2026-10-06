import { cn } from "cnfast";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import { XIcon } from "./icons";

interface ImageViewerProps {
  open: boolean;
  onClose: () => void;
  label: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface DragStart {
  pointerX: number;
  pointerY: number;
  scrollLeft: number;
  scrollTop: number;
}

function ImageViewer({ open, onClose, label, src, alt, width, height }: ImageViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<DragStart | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const scroller = scrollerRef.current;
    if (!dialog || !scroller) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
      scroller.scrollTo({ left: (scroller.scrollWidth - scroller.clientWidth) / 2, top: 0 });
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleClose() {
    document.documentElement.style.overflow = "";
    onClose();
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    // Touch and pen pan natively; pressing the scrollbar must not start a drag.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (event.target === event.currentTarget) return;

    const scroller = event.currentTarget;
    scroller.setPointerCapture(event.pointerId);
    dragStartRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      scrollLeft: scroller.scrollLeft,
      scrollTop: scroller.scrollTop,
    };
    setDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = dragStartRef.current;
    if (!start) return;

    const scroller = event.currentTarget;
    scroller.scrollLeft = start.scrollLeft - (event.clientX - start.pointerX);
    scroller.scrollTop = start.scrollTop - (event.clientY - start.pointerY);
  }

  function endDrag() {
    dragStartRef.current = null;
    setDragging(false);
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label={label}
      onClose={handleClose}
      className="m-0 h-dvh max-h-none w-dvw max-w-none border-0 bg-background p-0"
    >
      <div
        ref={scrollerRef}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "size-full overflow-auto select-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="mx-auto block h-auto max-w-none"
        />
      </div>
      <button
        type="button"
        aria-label="Close"
        onClick={() => dialogRef.current?.close()}
        className="fixed top-4 right-4 inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-foreground/5 bg-card shadow-md shadow-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:size-4"
      >
        <XIcon aria-hidden="true" />
      </button>
    </dialog>
  );
}

export { ImageViewer };
