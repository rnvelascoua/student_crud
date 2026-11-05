import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ notification, onClose }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-slideUp">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-xs transition-all ${
          isSuccess
            ? 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
            : isError
            ? 'bg-rose-50/95 border-rose-200 text-rose-900'
            : 'bg-indigo-50/95 border-indigo-200 text-indigo-900'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-indigo-600" />}
        </div>

        <div className="flex-1 text-xs">
          <p className="font-bold text-sm">
            {isSuccess ? 'Success' : isError ? 'Error Occurred' : 'Information'}
          </p>
          <p className="mt-0.5 leading-relaxed font-medium">{notification.message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          title="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
