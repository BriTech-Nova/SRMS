export interface InventoryItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorder_level: number;
    department: string;
    location: string;
    last_restocked: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface InventoryTransaction {
    id: number;
    item: InventoryItem;
    transaction_type: TransactionType;
    quantity: number;
    user: User;
    notes: string;
    created_at: string;
  }
  
  export enum TransactionType {
    RECEIVED = 'received',
    ISSUED = 'issued',
    TRANSFERRED = 'transferred',
    DISCARDED = 'discarded',
    RETURNED = 'returned',
  }