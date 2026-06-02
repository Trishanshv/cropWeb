export interface IGKVNewsItem {
  id: string;
  date: string;
  category: string;
  contentHindi: string;
  contentEnglish?: string;
}

export interface IGKVStatCard {
  label: string;
  count: number;
}

export interface IGKVCollege {
  id: string;
  name: string;
  location: string;
  bgImageUrl?: string;
  type: 'constituent' | 'affiliated';
}

export interface IGKVDepartment {
  id: string;
  name: string;
  bgImageUrl?: string;
}

export interface IGKVKrishiKendra {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
}

export interface IGKVEvent {
  id: string;
  title: string;
  imageUrl: string;
}

export interface IGKVData {
  news: IGKVNewsItem[];
  stats: {
    facultyCount: number;
    departmentCount: number;
    studentCount: number;
    maleCount: number;
    femaleCount: number;
  };
  constituentColleges: IGKVCollege[];
  affiliatedColleges: IGKVCollege[];
  departments: IGKVDepartment[];
  krishiKendras: IGKVKrishiKendra[];
  events: IGKVEvent[];
  visitorCount: number;
}
