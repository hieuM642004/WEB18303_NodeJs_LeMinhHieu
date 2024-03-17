import React from 'react';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, content }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        data-dialog-backdrop="dialog"
        data-dialog-backdrop-close="true"
        className="fixed inset-0 z-50 grid place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      >
        <div data-dialog="dialog" className="relative w-2/5 bg-white rounded-lg shadow-lg">
          <div className="p-4 text-xl font-semibold text-center border-b border-gray-300">{title}</div>
          <div className="p-4 text-sm text-center border-b border-gray-300">{content}</div>
          <div className="flex justify-end p-4 border-t border-gray-300">
            <button
              onClick={onClose}
              className="px-6 py-3 mr-1 font-semibold text-red-500 uppercase transition-all rounded-lg hover:bg-red-500/10 active:bg-red-500/30"
            >
              Hủy
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationModal;
