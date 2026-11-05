import React, { useState, useMemo } from 'react';
import { Search, Users, RefreshCw, Filter, AlertCircle } from 'lucide-react';
import StudentRow from './StudentRow';

export default function StudentTable({
  students,
  loading,
  error,
  editingStudentId,
  deletingId,
  onEdit,
  onDelete,
  onRefresh
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');

  // Extract unique courses for filter
  const courses = useMemo(() => {
    const list = students.map((s) => s.course?.trim()).filter(Boolean);
    return ['ALL', ...Array.from(new Set(list))];
  }, [students]);

  // Filter students based on search and selected course
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        s.firstname?.toLowerCase().includes(query) ||
        s.lastname?.toLowerCase().includes(query) ||
        s.course?.toLowerCase().includes(query) ||
        s.section?.toLowerCase().includes(query) ||
        String(s.id).includes(query);

      const matchesCourse =
        selectedCourse === 'ALL' || s.course?.toLowerCase() === selectedCourse.toLowerCase();

      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, selectedCourse]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
      {/* Top Toolbar */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-800">Student Directory</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
              {students.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            View, search, update, or remove student profiles
          </p>
        </div>

        {/* Search & Course Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, course, id..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition"
            />
          </div>

          {/* Course Filter */}
          {courses.length > 2 && (
            <div className="relative w-full sm:w-36">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition text-slate-700 cursor-pointer"
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course === 'ALL' ? 'All Courses' : course}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 rounded-xl transition disabled:opacity-50"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error state banner */}
      {error && (
        <div className="m-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-700">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={onRefresh}
            className="underline font-semibold hover:text-rose-900 cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/70 text-slate-600 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4 w-16">ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4 hidden sm:table-cell">Course</th>
              <th className="py-3 px-4 hidden sm:table-cell">Section</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-indigo-500 mb-2" />
                  <p className="text-xs font-medium">Loading student records from server...</p>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No students found</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {searchTerm || selectedCourse !== 'ALL'
                      ? 'Try adjusting your search filters.'
                      : 'Use the registration panel to add your first student.'}
                  </p>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  isCurrentlyEditing={editingStudentId === student.id}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={deletingId === student.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
        <span>
          Showing {filteredStudents.length} of {students.length} students
        </span>
        <span className="text-[11px] text-slate-400">
          Tip: Actions trigger inline confirmations (No modals)
        </span>
      </div>
    </div>
  );
}
