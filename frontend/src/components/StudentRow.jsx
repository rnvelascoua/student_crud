import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';

export default function StudentRow({
  student,
  isCurrentlyEditing,
  onEdit,
  onDelete,
  isDeleting
}) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  return (
    <tr
      className={`transition-colors border-b border-slate-100 ${
        isCurrentlyEditing
          ? 'bg-amber-50/70'
          : 'hover:bg-slate-50/80 bg-white'
      }`}
    >
      {/* Student ID */}
      <td className="py-3.5 px-4 text-xs font-mono font-medium text-slate-500">
        #{student.id}
      </td>

      {/* Full Name */}
      <td className="py-3.5 px-4">
        <div className="font-semibold text-slate-900 text-sm">
          {student.firstname} {student.lastname}
        </div>
        <div className="text-xs text-slate-400 sm:hidden">
          {student.course} - {student.section}
        </div>
      </td>

      {/* Course */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          {student.course}
        </span>
      </td>

      {/* Section */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          {student.section}
        </span>
      </td>

      {/* Actions (Strictly inline, NO MODALS) */}
      <td className="py-3.5 px-4 text-right">
        {isConfirmingDelete ? (
          <div className="inline-flex items-center gap-1.5 animate-fadeIn">
            <span className="text-xs font-semibold text-rose-600 mr-1 hidden md:inline">
              Delete?
            </span>
            <button
              onClick={() => {
                onDelete(student.id);
                setIsConfirmingDelete(false);
              }}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-2xs transition disabled:opacity-50"
              title="Confirm Delete"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              Confirm
            </button>
            <button
              onClick={() => setIsConfirmingDelete(false)}
              disabled={isDeleting}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1">
            <button
              onClick={() => onEdit(student)}
              className={`p-1.5 rounded-lg transition ${
                isCurrentlyEditing
                  ? 'bg-amber-100 text-amber-700 font-medium'
                  : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
              title="Edit Student"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsConfirmingDelete(true)}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              title="Delete Student"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
