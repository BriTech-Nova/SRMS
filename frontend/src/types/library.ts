export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string;
    publisher: string;
    publication_year: number;
    category: string;
    copies_available: number;
    total_copies: number;
    location: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface BookLoan {
    id: number;
    book: Book;
    borrower_name: string;
    borrower_type: BorrowerType;
    class?: string;
    borrowed_date: string;
    due_date: string;
    returned_date?: string;
    status: LoanStatus;
    created_at: string;
    updated_at: string;
  }
  
  export enum BorrowerType {
    STUDENT = 'student',
    TEACHER = 'teacher',
    STAFF = 'staff',
  }
  
  export enum LoanStatus {
    ACTIVE = 'active',
    OVERDUE = 'overdue',
    RETURNED = 'returned',
    LOST = 'lost',
  }
  
  export interface ClassTextbook {
    id: number;
    book: Book;
    class_name: string;
    academic_year: string;
    term: string;
    assigned_date: string;
    quantity: number;
    created_at: string;
    updated_at: string;
  }