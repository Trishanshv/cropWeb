export interface CropItem {
  id: string;
  name: string;
  scientificName?: string;
  type: string; // e.g. "Wheat", "Gram/Legume", "Safflower"
  svgPath: string; // custom local identifier to draw inline SVG or render specific graphic
}

export interface UserInfo {
  phone: string;
  email: string;
  gender: string;
  address: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  userInfo: UserInfo;
  crops: CropItem[];
}
