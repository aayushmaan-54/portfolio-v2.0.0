import Icons from "../icons/icons";


export default function Modal({ className, children, isOpen, onClose }: {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-xs flex items-center justify-center z-900 p-2 sm:p-4">
      <div className={`bg-primary-2 rounded-lg shadow-xl relative max-w-full max-h-full overflow-auto ${className || ''}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 text-accent-3/80 hover:text-accent-3 transition-all duration-200 hover:rotate-90 cursor-pointer bg-primary-2/80 rounded-full p-1"
          aria-label="Close modal"
        >
          <Icons.X className="size-4" />
        </button>

        <div className="pt-8 p-2">
          {children}
        </div>
      </div>
    </div>
  );
}
