import { Model } from "@burand/angular";

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'EXCLUDED';

export interface User extends Model {
  active: boolean;
  type: string;
  name: string;
  email: string;
  status?: UserStatus;
  fcmToken?: string;
}
