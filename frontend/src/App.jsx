import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StudentFormPanel from './components/StudentFormPanel';
import StudentTable from './components/StudentTable';
import ToastNotification from './components/ToastNotification';
import { studentService } from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const showToast = (type, message) => {
    setNotification({ type, message });
  };

  const closeToast = useCallback(() => {
    setNotification(null);
  }, []);

  // Fetch all students from backend
  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(
        err.message || 'Unable to connect to the Student API. Please ensure the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Save (Create or Update)
  const handleSaveStudent = async (formData) => {
    setSubmitting(true);
    try {
      if (editingStudent) {
        const updated = await studentService.updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showToast('success', `Student #${editingStudent.id} (${updated.firstname} ${updated.lastname}) updated.`);
        setEditingStudent(null);
      } else {
        const created = await studentService.createStudent(formData);
        setStudents((prev) => [created, ...prev]);
        showToast('success', `Student ${created.firstname} ${created.lastname} registered successfully.`);
      }
    } catch (err) {
      console.error('Save failed:', err);
      showToast('error', err.message || 'Failed to save student record.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete (Inline confirmed, no modals)
  const handleDeleteStudent = async (id) => {
    setDeletingId(id);
    try {
      await studentService.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showToast('success', `Student #${id} has been deleted.`);
    } catch (err) {
      console.error('Delete failed:', err);
      showToast('error', err.message || `Failed to delete student #${id}.`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    // Smooth scroll to form on mobile viewports
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Header
        isEditing={Boolean(editingStudent)}
        onAddNewClick={handleCancelEdit}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Embedded Form Panel (NO MODAL) */}
          <div className="lg:col-span-1">
            <StudentFormPanel
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={submitting}
            />
          </div>

          {/* Right Column: Student Directory Table */}
          <div className="lg:col-span-2">
            <StudentTable
              students={students}
              loading={loading}
              error={error}
              editingStudentId={editingStudent?.id}
              deletingId={deletingId}
              onEdit={handleEditClick}
              onDelete={handleDeleteStudent}
              onRefresh={loadStudents}
            />
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200/60 bg-white text-center text-xs text-slate-400">
        Student CRUD System &bull; Built with Vite + React + Tailwind CSS (No Modals) &bull; Spring Boot REST API
      </footer>

      {/* Non-blocking feedback toast */}
      <ToastNotification notification={notification} onClose={closeToast} />
    </div>
  );
}
