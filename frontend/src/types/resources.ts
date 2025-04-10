export interface ResourceRequest {
    id: number;
    teacher: User;
    resource_type: string;
    resource_name: string;
    quantity: number;
    description: string;
    status: RequestStatus;
    created_at: string;
    updated_at: string;
  }
  
  export enum RequestStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    FULFILLED = 'fulfilled',
  }