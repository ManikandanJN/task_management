import React, { useEffect, useRef, useState } from "react";

interface CustomModelProps {
  open?: boolean;
  children?: React.ReactNode;
  customStyleForContent?: string;
  onClose: () => void;
  title?: string;
}

const CustomModal: React.FC<CustomModelProps> = ({
  open = false,
  children,
  customStyleForContent,
  onClose,
  title = "",
}) => {
  const [showModal, setShowModal] = useState<boolean>(open);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
        onClose();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, onClose]);

  return (
    <>
      {showModal && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-black bg-opacity-70">
          <div
            ref={modalRef}
            className={`relative max-w-full h-[90%] overflow-y-auto rounded-2xl bg-white ${
              customStyleForContent ? customStyleForContent : "w-96"
            }`}
          >
            <div className="sticky top-0 z-50 flex justify-between items-center p-2 sm:p-4 bg-white border border-b-2">
              <h2 className="text-base sm:text-[24px] font-semibold">
                {title}
              </h2>

              <div className="flex gap-3">
                <button
                  className="text-black hover:text-app-color rounded-full p-1 px-2 text-base sm:text-[18px]"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomModal;
