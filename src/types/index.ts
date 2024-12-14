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
  message: string;
}

export interface FavoriteCrowdfund {
  user_id: string;
  crowdfund_id: string;
}

export interface Crowdfund {
  name: string;
  target: string;
  current_donation: number;
  status: CrowdfundStatus;
  favorite_crowdfund: FavoriteCrowdfund;
  created_at: Date;
}