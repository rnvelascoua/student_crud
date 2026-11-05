import React from 'react';
import { GraduationCap, UserPlus } from 'lucide-react';

export default function Header({ isEditing, onAddNewClick }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                Student Manager
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Full-Stack Spring Boot & React CRUD Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isEditing && (
              <button
                onClick={onAddNewClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors shadow-2xs"
              >
                <UserPlus className="w-4 h-4" />
                Add New Student
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              API Connected
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
