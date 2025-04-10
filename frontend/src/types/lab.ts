export interface Lab {
    id: number;
    lab_number: string;
    name: string;
    capacity: number;
    description: string;
    is_available: boolean;
  }
  
  export interface LabBooking {
    id: number;
    lab: Lab;
    teacher: User;
    date: string;
    start_time: string;
    end_time: string;
    purpose: string;
    requirements: string;
    status: BookingStatus;
    created_at: string;
    updated_at: string;
  }
  
  export enum BookingStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
  }