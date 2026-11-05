const API_BASE_URL = '/velasco/students';

/**
 * Service to handle all HTTP operations with the Spring Boot Student API
 */
export const studentService = {
  /**
   * Fetch all students
   * @returns {Promise<Array>} List of students
   */
  async getAllStudents() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch students (Status: ${response.status})`);
    }
    return response.json();
  },

  /**
   * Fetch a single student by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Student object
   */
  async getStudentById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to find student with ID ${id}`);
    }
    return response.json();
  },

  /**
   * Create a new student record
   * @param {Object} studentData { firstname, lastname, course, section }
   * @returns {Promise<Object>} Created student
   */
  async createStudent(studentData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: studentData.firstname?.trim(),
        lastname: studentData.lastname?.trim(),
        course: studentData.course?.trim(),
        section: studentData.section?.trim()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to create student (Status: ${response.status})`);
    }
    return response.json();
  },

  /**
   * Update an existing student record
   * @param {number|string} id 
   * @param {Object} studentData { firstname, lastname, course, section }
   * @returns {Promise<Object>} Updated student
   */
  async updateStudent(id, studentData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: studentData.firstname?.trim(),
        lastname: studentData.lastname?.trim(),
        course: studentData.course?.trim(),
        section: studentData.section?.trim()
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to update student with ID ${id}`);
    }
    return response.json();
  },

  /**
   * Delete a student by ID
   * @param {number|string} id 
   * @returns {Promise<string>} Success message
   */
  async deleteStudent(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to delete student with ID ${id}`);
    }
    return response.text();
  }
};
