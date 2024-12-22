export enum PaymentMethod {
  QRIS = 'QRIS',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum CrowdfundStatus {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE'
}

export interface Feedback {
  name: string;
  is_anonymous: boolean;
  email: string;
  message: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface Donation {
  payment_method: PaymentMethod;
  amount: number;
}

export interface Comment {
  user_name: string;
  message: string;
  timestamp: Date;
}

export interface FavoriteCrowdfund {
  user_id: string;
  crowdfund_id: string;
}

export interface Crowdfund {
  id: string;
  name: string;
  description?: string;
  target: string;
  current_donation: number;
  status: CrowdfundStatus;
  image : string;
  favorite_crowdfund: FavoriteCrowdfund[];
  created_at: Date;
  comments?: Comment[];
  isFavorited?: boolean;
}