import React, { useState, useEffect } from 'react';
import { UserCheck, UserPlus, X, RefreshCw, AlertCircle } from 'lucide-react';

const INITIAL_FORM = {
  firstname: '',
  lastname: '',
  course: '',
  section: ''
};

export default function StudentFormPanel({
  editingStudent,
  onSave,
  onCancelEdit,
  isSubmitting
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || ''
      });
      setErrors({});
    } else {
      setFormData(INITIAL_FORM);
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    if (editingStudent) {
      onCancelEdit();
    }
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl text-white ${
              isEditMode ? 'bg-amber-500' : 'bg-indigo-600'
            }`}
          >
            {isEditMode ? <UserCheck className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isEditMode ? 'Edit Student Details' : 'Register New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode
                ? `Updating ID #${editingStudent.id}`
                : 'Fill in all fields to add a student'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="Cancel editing"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="e.g. John"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.firstname
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
            }`}
          />
          {errors.firstname && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="e.g. Doe"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
              errors.lastname
                ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
            }`}
          />
          {errors.lastname && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.lastname}
            </p>
          )}
        </div>

        {/* Course & Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.course
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.course}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition ${
                errors.section
                  ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200 bg-rose-50/30'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 bg-slate-50/50 focus:bg-white'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.section}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm transition ${
              isEditMode
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                {isEditMode ? 'Updating...' : 'Saving...'}
              </>
            ) : isEditMode ? (
              'Update Student'
            ) : (
              'Save Student'
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition disabled:opacity-50"
          >
            {isEditMode ? 'Cancel' : 'Clear'}
          </button>
        </div>
      </form>
    </div>
  );
}
