/* eslint-disable prefer-const, @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import Modal from '~/common/components/modal';
import doodleWallColorPalette from '~/common/data/doodle-wall-color-palette';
import Icons from '~/common/icons/icons';
import CircularProgressBar from './circular-progress-bar';
import Form from 'next/form';
import SubmitDoodleAction from '~/actions/submit-doodle.action';
import toast from 'react-hot-toast';
import { Models } from 'appwrite';

interface DoodleBoardModalProps {
  onDoodleCreated?: (newDoodle: Models.Document) => void;
}



export default function DoodleBoardModal({ onDoodleCreated }: DoodleBoardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const brushWidthButtonRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const [drawingCanvas, setDrawingCanvas] = useState<fabric.Canvas | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [brushWidth, setBrushWidth] = useState(10);
  const [brushColor, setBrushColor] = useState('#000000');
  const [isEraserMode, setIsEraserMode] = useState(false);

  const [isPopOverBrushWidthOpen, setIsPopOverBrushWidthOpen] = useState(false);

  const [doodleMessage, setDoodleMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);

  const undoStackRef = useRef<string[]>([]);
  const redoStackRef = useRef<string[]>([]);


  useEffect(() => {
    undoStackRef.current = undoStack;
  }, [undoStack]);


  useEffect(() => {
    redoStackRef.current = redoStack;
  }, [redoStack]);


  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    if (drawingCanvas) {
      drawingCanvas.dispose();
      setDrawingCanvas(null);
      setIsEraserMode(false);
      setBrushColor('#000000');
      setUndoStack([]);
      setRedoStack([]);
      setDoodleMessage('');
    }
  };


  useEffect(() => {
    if (!isModalOpen || !canvasRef.current) return;
    if (drawingCanvas && drawingCanvas.getElement() === canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 500,
      height: 500,
      isDrawingMode: true,
      selection: false,
      backgroundColor: '#E8E8E8',
    });

    const pencilBrush = new fabric.PencilBrush(fabricCanvas);
    pencilBrush.width = brushWidth;
    pencilBrush.color = brushColor;
    (pencilBrush as any).globalCompositeOperation = 'source-over';

    fabricCanvas.freeDrawingBrush = pencilBrush;
    fabricCanvas.renderAll.bind(fabricCanvas);
    setDrawingCanvas(fabricCanvas);

    const resizeCanvas = () => {
      if (canvasRef.current && fabricCanvas && canvasContainerRef.current) {
        const container = canvasContainerRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const maxSize = Math.min(containerWidth - 40, containerHeight - 40, 600);
        const minSize = Math.max(maxSize, 280);

        const newSize = Math.max(minSize, maxSize);

        fabricCanvas.setDimensions({ width: newSize, height: newSize });
        fabricCanvas.renderAll();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isModalOpen, drawingCanvas, brushWidth, brushColor]);


  useEffect(() => {
    if (!drawingCanvas) return;

    const handleMouseDown = () => {
      const canvasState = JSON.stringify(drawingCanvas.toJSON());
      setUndoStack(prev => [...prev, canvasState]);
      setRedoStack([]);
    };

    drawingCanvas.on('mouse:down', handleMouseDown);

    return () => {
      drawingCanvas.off('mouse:down', handleMouseDown);
    };
  }, [drawingCanvas]);


  useEffect(() => {
    if (drawingCanvas && drawingCanvas.freeDrawingBrush) {
      drawingCanvas.freeDrawingBrush.width = brushWidth;

      const currentBrush = drawingCanvas.freeDrawingBrush as any;

      if (isEraserMode) {
        currentBrush.color = '#E8E8E8';
        currentBrush.globalCompositeOperation = 'destination-out';
      } else {
        currentBrush.color = brushColor;
        currentBrush.globalCompositeOperation = 'source-over';
      }
    }
  }, [brushWidth, drawingCanvas, isEraserMode, brushColor]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        brushWidthButtonRef.current &&
        !brushWidthButtonRef.current.contains(event.target as Node)
      ) {
        setIsPopOverBrushWidthOpen(false);
      }
    };

    if (isPopOverBrushWidthOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopOverBrushWidthOpen]);


  const handleUndo = () => {
    if (undoStack.length === 0 || !drawingCanvas) return;

    const newUndoStack = [...undoStack];
    const previousState = newUndoStack.pop();
    if (!previousState) return;

    const currentState = JSON.stringify(drawingCanvas.toJSON());
    setRedoStack(prev => [...prev, currentState]);

    setUndoStack(newUndoStack);

    drawingCanvas.clear();
    drawingCanvas.loadFromJSON(previousState).then(() => {
      drawingCanvas.renderAll();
    });
  };


  const handleRedo = () => {
    if (redoStack.length === 0 || !drawingCanvas) return;

    const newRedoStack = [...redoStack];
    const nextState = newRedoStack.pop();

    if (!nextState) return;

    const currentState = JSON.stringify(drawingCanvas.toJSON());
    setUndoStack(prev => [...prev, currentState]);

    setRedoStack(newRedoStack);

    drawingCanvas.clear();
    drawingCanvas.loadFromJSON(nextState).then(() => {
      drawingCanvas.renderAll();
    });
  };


  const handleEraser = () => {
    setIsEraserMode(true);
  };


  const handleSetBrushColor = (color: string) => {
    setBrushColor(color);
    setIsEraserMode(false);
  };


  const handleClearCanvas = () => {
    if (drawingCanvas) {
      const canvasState = JSON.stringify(drawingCanvas.toJSON());
      setUndoStack(prev => [...prev, canvasState]);
      setRedoStack([]);

      drawingCanvas.clear();
      drawingCanvas.backgroundColor = '#E8E8E8';
      drawingCanvas.renderAll.bind(drawingCanvas);
    }
  };


  const handleSubmit = async (formData: FormData) => {
    if (!drawingCanvas) {
      toast.error("Please draw something before submitting!");
      return;
    }

    setIsSubmitting(true);
    const svgData = drawingCanvas.toSVG();
    formData.append('svgData', svgData);
    const result = await SubmitDoodleAction(formData);

    if (result.success) {
      toast.success(result.message || "Doodle submitted!");

      if (result.data && onDoodleCreated) {
        onDoodleCreated(result.data);
      }

      closeModal();
    } else {
      toast.error(result.message || "Failed to submit doodle.");
    }
    setIsSubmitting(false);
  };


  return (
    <>
      <div className='max-w-7xl sm:pr-10 pr-6 flex items-center justify-end'>
        <button
          onClick={openModal}
          className="button-1 flex items-center justify-center gap-2 font-semibold"
        >
          <Icons.PaintBrush className='size-5' />
          Leave a Doodle
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col items-center w-full max-w-lg mx-auto">
          <div className="flex flex-col lg:flex-row gap-2 mb-3 p-2 rounded-lg w-full">
            <div className='flex flex-wrap gap-0.5 items-center justify-center border-b lg:border-b-0 lg:border-r border-accent-3/20 pb-2 lg:pb-0 lg:pr-2'>
              {doodleWallColorPalette.map((color) => (
                <div key={color} className={`flex items-center justify-center p-1 rounded-md transition-all duration-200 ${brushColor === color && !isEraserMode ? 'bg-accent-3/20' : ''}`}>
                  <button
                    onClick={() => handleSetBrushColor(color)}
                    className='size-4 sm:size-5 rounded-full hover:scale-107 transition-all duration-200 cursor-pointer shadow-sm'
                    style={{ backgroundColor: color }}
                    title={`Set brush color to ${color}`}
                  />
                </div>
              ))}
            </div>

            <div className='flex flex-wrap items-center justify-center gap-1'>
              <div className="flex items-center justify-center p-1 rounded-md">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                  className={`${undoStack.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} transition-all duration-200 p-1 rounded-full flex items-center justify-center`}
                >
                  <Icons.Undo className='size-4 sm:size-5' />
                </button>
              </div>

              <div className="flex items-center justify-center p-1 rounded-md">
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className={`${redoStack.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'} transition-all duration-200 p-1 rounded-full flex items-center justify-center`}
                >
                  <Icons.Redo className='size-4 sm:size-5' />
                </button>
              </div>

              <div className={`flex items-center justify-center p-1 rounded-md transition-all duration-200 ${isEraserMode ? 'bg-accent-3/20' : ''}`}>
                <button
                  type="button"
                  onClick={handleEraser}
                  className={`hover:scale-110 transition-all duration-200 p-1 rounded-full flex items-center justify-center`}
                >
                  <Icons.Eraser className='size-4 sm:size-5' />
                </button>
              </div>

              <div className="flex items-center justify-center p-1 rounded-md">
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  className="hover:scale-110 transition-all duration-200 p-1 rounded-full flex items-center justify-center"
                >
                  <Icons.TrashBin className='size-4 sm:size-5' />
                </button>
              </div>

              <div ref={brushWidthButtonRef} className="relative flex items-center justify-center">
                <div className={`flex items-center justify-center p-1 rounded-md transition-all duration-200 ${isPopOverBrushWidthOpen ? 'bg-accent-3/20' : ''}`}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPopOverBrushWidthOpen(prev => !prev);
                    }}
                    className={`hover:scale-107 transition-all duration-200 cursor-pointer flex items-center justify-center`}
                  >
                    <Icons.CircleDot className='size-4 sm:size-5' />
                  </button>
                </div>

                {isPopOverBrushWidthOpen && (
                  <div
                    ref={popoverRef}
                    className="flex flex-col items-center mb-4 border rounded-md px-2 py-2 h-28 absolute left-1/2 transform -translate-x-1/2 lg:-left-10 lg:transform-none z-10 shadow-lg bg-primary-3 border-primary-4"
                    style={{ top: '100%', marginTop: '8px' }}
                  >
                    <input
                      type="range"
                      id="brush-width"
                      style={{ accentColor: '#1E88E5' }}
                      min="10"
                      max="50"
                      value={brushWidth}
                      onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                      className="w-20 sm:w-24 h-2 bg-gray-300 rounded-md appearance-none cursor-pointer range-sm"
                      aria-label="Brush Width"
                    />

                    <span
                      style={{
                        width: brushWidth,
                        height: brushWidth,
                        backgroundColor: isEraserMode ? 'transparent' : brushColor,
                        border: isEraserMode ? '1px solid var(--color-accent-3)' : 'none'
                      }}
                      className="rounded-full mt-7"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            ref={canvasContainerRef}
            className="w-full flex justify-center items-center min-h-[280px] sm:min-h-[350px] lg:min-h-[400px] mb-3"
          >
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-lg max-w-full max-h-full"
            />
          </div>

          <div className="w-full flex justify-center">
            <Form
              className="flex flex-col gap-3"
              style={{ width: drawingCanvas?.getWidth() || '100%' }}
              action={handleSubmit}
            >
              <input
                type="text"
                name="name"
                className="input text-sm sm:text-base"
                placeholder="john doe"
                max={20}
                disabled={isSubmitting}
              />

              <input
                type="text"
                name="message"
                className="input text-sm sm:text-base"
                placeholder="Enter your message..."
                value={doodleMessage}
                maxLength={50}
                disabled={isSubmitting}
                onChange={(e) => setDoodleMessage(e.target.value)}
              />

              <div className='flex items-center justify-between px-2'>
                <CircularProgressBar
                  value={doodleMessage.length}
                  min={0}
                  max={50}
                  gaugePrimaryColor="#1E88E5"
                  gaugeSecondaryColor="#E0E0E0"
                  className='size-6 sm:size-8 text-xs sm:text-sm font-bold'
                />

                <button
                  type="submit"
                  className="button-1 rounded-lg! font-bold text-sm sm:text-base px-3 sm:px-4 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Doodle'}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
