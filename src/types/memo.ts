export interface Officer {
  id: string;
  name: string;
  nameAr: string;
  rank: string;
  rankAr: string;
  department: string;
  departmentAr: string;
  email: string;
  phone: string;
  employeeId: string;
  unit: string;
  unitAr: string;
}

export interface Memo {
  id: string;
  number: number;
  title: string;
  titleAr: string;
  content: string;
  contentAr: string;
  category: string;
  categoryAr: string;
  subcategory: string;
  subcategoryAr: string;
  createdBy: string;
  createdByAr: string;
  createdFor: string;
  createdForAr: string;
  createdDate: string;
  lastModified: string;
  status: 'draft' | 'sent' | 'archived';
  priority: 'low' | 'medium' | 'high';
  additionalFields: Record<string, string>;
}

export interface MemoStats {
  totalMemos: number;
  memosThisMonth: number;
  memosThisWeek: number;
  draftMemos: number;
  sentMemos: number;
  archivedMemos: number;
  topCategories: Array<{ category: string; categoryAr: string; count: number }>;
  topCreators: Array<{ name: string; nameAr: string; count: number }>;
  recentActivity: Array<{ 
    action: string; 
    actionAr: string; 
    memo: string; 
    memoAr: string; 
    time: string; 
    user: string;
    userAr: string;
  }>;
  monthlyData: Array<{ month: string; count: number }>;
}

export interface MemoCategory {
  id: string;
  name: string;
  nameAr: string;
  subcategories: Array<{
    id: string;
    name: string;
    nameAr: string;
    fields: Array<{
      name: string;
      nameAr: string;
      type: 'text' | 'date' | 'select';
      options?: string[];
      required: boolean;
    }>;
  }>;
}