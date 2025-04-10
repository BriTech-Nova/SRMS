import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Configure axios
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration or unauthorized access
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Create API service classes for each module
export class ResourceService {
  static async getRequests() {
    const response = await axios.get(`${API_URL}/resources/requests/`);
    return response.data;
  }
  
  static async createRequest(requestData: any) {
    const response = await axios.post(`${API_URL}/resources/requests/`, requestData);
    return response.data;
  }
  
  static async updateRequestStatus(id: number, status: string) {
    const response = await axios.patch(`${API_URL}/resources/requests/${id}/`, { status });
    return response.data;
  }
}

export class LabService {
  static async getLabs() {
    const response = await axios.get(`${API_URL}/labs/`);
    return response.data;
  }
  
  static async getLabBookings() {
    const response = await axios.get(`${API_URL}/labs/bookings/`);
    return response.data;
  }
  
  static async createLabBooking(bookingData: any) {
    const response = await axios.post(`${API_URL}/labs/bookings/`, bookingData);
    return response.data;
  }
  
  static async updateBookingStatus(id: number, status: string, technicianNotes?: string) {
    const response = await axios.patch(`${API_URL}/labs/bookings/${id}/`, { 
      status, 
      technician_notes: technicianNotes 
    });
    return response.data;
  }
}

export class InventoryService {
  static async getItems() {
    const response = await axios.get(`${API_URL}/inventory/items/`);
    return response.data;
  }
  
  static async createItem(itemData: any) {
    const response = await axios.post(`${API_URL}/inventory/items/`, itemData);
    return response.data;
  }
  
  static async updateItem(id: number, itemData: any) {
    const response = await axios.patch(`${API_URL}/inventory/items/${id}/`, itemData);
    return response.data;
  }
  
  static async createTransaction(transactionData: any) {
    const response = await axios.post(`${API_URL}/inventory/transactions/`, transactionData);
    return response.data;
  }
  
  static async getTransactions() {
    const response = await axios.get(`${API_URL}/inventory/transactions/`);
    return response.data;
  }
}

export class LibraryService {
  static async getBooks() {
    const response = await axios.get(`${API_URL}/library/books/`);
    return response.data;
  }
  
  static async createBook(bookData: any) {
    const response = await axios.post(`${API_URL}/library/books/`, bookData);
    return response.data;
  }
  
  static async createLoan(loanData: any) {
    const response = await axios.post(`${API_URL}/library/loans/`, loanData);
    return response.data;
  }
  
  static async returnBook(id: number) {
    const response = await axios.patch(`${API_URL}/library/loans/${id}/return/`, {});
    return response.data;
  }
  
  static async assignTextbooks(assignmentData: any) {
    const response = await axios.post(`${API_URL}/library/class-textbooks/`, assignmentData);
    return response.data;
  }
  
  static async getLoans(status?: string) {
    let url = `${API_URL}/library/loans/`;
    if (status) {
      url += `?status=${status}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
}

export class ReportService {
  static async getResourceStats() {
    const response = await axios.get(`${API_URL}/reports/resources/`);
    return response.data;
  }
  
  static async getLabStats() {
    const response = await axios.get(`${API_URL}/reports/labs/`);
    return response.data;
  }
  
  static async getInventoryStats() {
    const response = await axios.get(`${API_URL}/reports/inventory/`);
    return response.data;
  }
  
  static async getLibraryStats() {
    const response = await axios.get(`${API_URL}/reports/library/`);
    return response.data;
  }
}