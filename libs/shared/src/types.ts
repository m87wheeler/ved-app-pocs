// Generic Database Entry Type
export type DBEntry<T> = Readonly<
  T & {
    id: string;
    createdAt: number;
    updatedAt: number;
  }
>;

// Data Transfer Object Types
export type UserDTO = {
  firstName: string;
  lastName: string;
  email: string;
};

export type PromotionDTO = {
  title: string;
  discountType: "percentage" | "fixed";
  amount: number;
  validUntil: Date;
  code: string;
};

export type MemberDTO = UserDTO & {
  level: "basic" | "premium";
  memberSince: Date;
  promotions: PromotionDTO[];
};

export type SessionBridgeDTO = {
  key: string;
  memberId: number;
  promoId: string;
  expiresAt: number;
};

// Database Types
export type DBUser = DBEntry<
  UserDTO & {
    password: string;
  }
>; // use email as key

export type DBMember = DBEntry<MemberDTO>;

export type DBPromotion = DBEntry<PromotionDTO>;

export type DBSessionBridge = DBEntry<SessionBridgeDTO>; // use key as id
