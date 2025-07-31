import { Officer, Memo, MemoStats, MemoCategory } from '../types/memo';

// Mock Officers Database
export const mockOfficers: Officer[] = [
  {
    id: '1',
    name: 'Ahmed Al-Rashid',
    nameAr: 'أحمد الراشد',
    rank: 'Colonel',
    rankAr: 'عقيد',
    department: 'Human Resources',
    departmentAr: 'الموارد البشرية',
    email: 'ahmed.rashid@mod.gov.sa',
    phone: '+966501234567',
    employeeId: 'MOD001',
    unit: 'Administrative Division',
    unitAr: 'الشعبة الإدارية'
  },
  {
    id: '2',
    name: 'Mohammed Al-Saud',
    nameAr: 'محمد السعود',
    rank: 'Major',
    rankAr: 'رائد',
    department: 'Operations',
    departmentAr: 'العمليات',
    email: 'mohammed.saud@mod.gov.sa',
    phone: '+966501234568',
    employeeId: 'MOD002',
    unit: 'Field Operations',
    unitAr: 'العمليات الميدانية'
  },
  {
    id: '3',
    name: 'Khalid Al-Otaibi',
    nameAr: 'خالد العتيبي',
    rank: 'Captain',
    rankAr: 'نقيب',
    department: 'Training',
    departmentAr: 'التدريب',
    email: 'khalid.otaibi@mod.gov.sa',
    phone: '+966501234569',
    employeeId: 'MOD003',
    unit: 'Training Center',
    unitAr: 'مركز التدريب'
  },
  {
    id: '4',
    name: 'Abdullah Al-Harbi',
    nameAr: 'عبدالله الحربي',
    rank: 'Lieutenant',
    rankAr: 'ملازم',
    department: 'Intelligence',
    departmentAr: 'الاستخبارات',
    email: 'abdullah.harbi@mod.gov.sa',
    phone: '+966501234570',
    employeeId: 'MOD004',
    unit: 'Intelligence Unit',
    unitAr: 'وحدة الاستخبارات'
  },
  {
    id: '5',
    name: 'Fahd Al-Mutairi',
    nameAr: 'فهد المطيري',
    rank: 'General',
    rankAr: 'لواء',
    department: 'Command',
    departmentAr: 'القيادة',
    email: 'fahd.mutairi@mod.gov.sa',
    phone: '+966501234571',
    employeeId: 'MOD005',
    unit: 'Command Center',
    unitAr: 'مركز القيادة'
  }
];

// Mock Memo Categories (based on your Python code)
export const memoCategories: MemoCategory[] = [
  {
    id: 'transfers',
    name: 'Transfers',
    nameAr: 'النقل',
    subcategories: [
      {
        id: 'internal-transfer',
        name: 'Internal Transfer',
        nameAr: 'نقل داخلي',
        fields: [
          { name: 'New Unit', nameAr: 'الوحدة الجديدة', type: 'text', required: true },
          { name: 'Transfer Date', nameAr: 'تاريخ النقل', type: 'date', required: true },
          { name: 'Transfer Reason', nameAr: 'سبب النقل', type: 'text', required: false }
        ]
      },
      {
        id: 'external-transfer',
        name: 'External Transfer',
        nameAr: 'نقل خارجي',
        fields: [
          { name: 'New Unit', nameAr: 'الوحدة الجديدة', type: 'text', required: true },
          { name: 'Transfer Date', nameAr: 'تاريخ النقل', type: 'date', required: true },
          { name: 'Transfer Reason', nameAr: 'سبب النقل', type: 'text', required: false }
        ]
      },
      {
        id: 'exceptional-transfer',
        name: 'Exceptional Transfer',
        nameAr: 'نقل استثنائي',
        fields: [
          { name: 'New Unit', nameAr: 'الوحدة الجديدة', type: 'text', required: true },
          { name: 'Transfer Date', nameAr: 'تاريخ النقل', type: 'date', required: true },
          { name: 'Exceptional Reason', nameAr: 'السبب الاستثنائي', type: 'text', required: true }
        ]
      },
      {
        id: 'personnel-redistribution',
        name: 'Redistribution of Personnel',
        nameAr: 'إعادة توزيع الأفراد',
        fields: [
          { name: 'New Assignment', nameAr: 'التكليف الجديد', type: 'text', required: true },
          { name: 'Effective Date', nameAr: 'تاريخ السريان', type: 'date', required: true }
        ]
      }
    ]
  },
  {
    id: 'leaves',
    name: 'Leaves',
    nameAr: 'الإجازات',
    subcategories: [
      {
        id: 'annual-leave',
        name: 'Annual Leave',
        nameAr: 'إجازة اعتيادية',
        fields: [
          { name: 'Leave Start Date', nameAr: 'تاريخ بدء الإجازة', type: 'date', required: true },
          { name: 'Leave End Date', nameAr: 'تاريخ انتهاء الإجازة', type: 'date', required: true },
          { name: 'Leave Duration', nameAr: 'مدة الإجازة', type: 'text', required: true }
        ]
      },
      {
        id: 'emergency-leave',
        name: 'Emergency Leave',
        nameAr: 'إجازة طارئة',
        fields: [
          { name: 'Leave Start Date', nameAr: 'تاريخ بدء الإجازة', type: 'date', required: true },
          { name: 'Leave End Date', nameAr: 'تاريخ انتهاء الإجازة', type: 'date', required: true },
          { name: 'Emergency Reason', nameAr: 'سبب الطوارئ', type: 'text', required: true }
        ]
      },
      {
        id: 'medical-leave',
        name: 'Medical Leave',
        nameAr: 'إجازة مرضية',
        fields: [
          { name: 'Leave Start Date', nameAr: 'تاريخ بدء الإجازة', type: 'date', required: true },
          { name: 'Leave End Date', nameAr: 'تاريخ انتهاء الإجازة', type: 'date', required: true },
          { name: 'Medical Condition', nameAr: 'الحالة المرضية', type: 'text', required: true }
        ]
      },
      {
        id: 'leave-extension',
        name: 'Leave Extension',
        nameAr: 'تمديد إجازة',
        fields: [
          { name: 'Original End Date', nameAr: 'تاريخ الانتهاء الأصلي', type: 'date', required: true },
          { name: 'New End Date', nameAr: 'تاريخ الانتهاء الجديد', type: 'date', required: true },
          { name: 'Extension Reason', nameAr: 'سبب التمديد', type: 'text', required: true }
        ]
      },
      {
        id: 'leave-cancellation',
        name: 'Leave Cancellation',
        nameAr: 'إلغاء إجازة',
        fields: [
          { name: 'Original Leave Date', nameAr: 'تاريخ الإجازة الأصلي', type: 'date', required: true },
          { name: 'Cancellation Reason', nameAr: 'سبب الإلغاء', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    id: 'promotions',
    name: 'Promotions',
    nameAr: 'الترقيات',
    subcategories: [
      {
        id: 'due-promotion',
        name: 'Due Promotion',
        nameAr: 'ترقية مستحقة',
        fields: [
          { name: 'New Rank', nameAr: 'الرتبة الجديدة', type: 'text', required: true },
          { name: 'Promotion Date', nameAr: 'تاريخ الترقية', type: 'date', required: true },
          { name: 'Service Years', nameAr: 'سنوات الخدمة', type: 'text', required: true }
        ]
      },
      {
        id: 'exceptional',
        name: 'Exceptional Promotion',
        nameAr: 'ترقية استثنائية',
        fields: [
          { name: 'New Rank', nameAr: 'الرتبة الجديدة', type: 'text', required: true },
          { name: 'Promotion Date', nameAr: 'تاريخ الترقية', type: 'date', required: true },
          { name: 'Exceptional Reason', nameAr: 'السبب الاستثنائي', type: 'text', required: true }
        ]
      },
      {
        id: 'temporary-rank-confirmation',
        name: 'Confirmation of Temporary Rank',
        nameAr: 'تثبيت رتبة مؤقتة',
        fields: [
          { name: 'Confirmed Rank', nameAr: 'الرتبة المثبتة', type: 'text', required: true },
          { name: 'Confirmation Date', nameAr: 'تاريخ التثبيت', type: 'date', required: true }
        ]
      }
    ]
  },
  {
    id: 'evaluations',
    name: 'Evaluations',
    nameAr: 'التقييمات',
    subcategories: [
      {
        id: 'positive-evaluation',
        name: 'Positive Evaluation',
        nameAr: 'تقييم إيجابي',
        fields: [
          { name: 'Evaluation Period', nameAr: 'فترة التقييم', type: 'text', required: true },
          { name: 'Performance Rating', nameAr: 'تقدير الأداء', type: 'select', options: ['ممتاز', 'جيد جداً', 'جيد'], required: true },
          { name: 'Achievements', nameAr: 'الإنجازات', type: 'text', required: false }
        ]
      },
      {
        id: 'negative-evaluation',
        name: 'Negative Evaluation',
        nameAr: 'تقييم سلبي',
        fields: [
          { name: 'Evaluation Period', nameAr: 'فترة التقييم', type: 'text', required: true },
          { name: 'Performance Issues', nameAr: 'مشاكل الأداء', type: 'text', required: true },
          { name: 'Improvement Plan', nameAr: 'خطة التحسين', type: 'text', required: true }
        ]
      },
      {
        id: 'development-recommendation',
        name: 'Recommendation for Development',
        nameAr: 'توصية بالتطوير',
        fields: [
          { name: 'Development Area', nameAr: 'مجال التطوير', type: 'text', required: true },
          { name: 'Recommended Program', nameAr: 'البرنامج المقترح', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    id: 'disciplinary',
    name: 'Disciplinary Actions',
    nameAr: 'العقوبات',
    subcategories: [
      {
        id: 'verbal-warning',
        name: 'Verbal Warning',
        nameAr: 'إنذار شفهي',
        fields: [
          { name: 'Warning Reason', nameAr: 'سبب الإنذار', type: 'text', required: true },
          { name: 'Warning Date', nameAr: 'تاريخ الإنذار', type: 'date', required: true }
        ]
      },
      {
        id: 'written-warning',
        name: 'Written Warning',
        nameAr: 'إنذار خطي',
        fields: [
          { name: 'Warning Reason', nameAr: 'سبب الإنذار', type: 'text', required: true },
          { name: 'Warning Date', nameAr: 'تاريخ الإنذار', type: 'date', required: true },
          { name: 'Consequences', nameAr: 'العواقب', type: 'text', required: false }
        ]
      },
      {
        id: 'temporary-suspension',
        name: 'Temporary Suspension',
        nameAr: 'إيقاف مؤقت',
        fields: [
          { name: 'Suspension Reason', nameAr: 'سبب الإيقاف', type: 'text', required: true },
          { name: 'Suspension Start Date', nameAr: 'تاريخ بدء الإيقاف', type: 'date', required: true },
          { name: 'Suspension Duration', nameAr: 'مدة الإيقاف', type: 'text', required: true }
        ]
      },
      {
        id: 'demotion',
        name: 'Demotion',
        nameAr: 'تخفيض رتبة',
        fields: [
          { name: 'Current Rank', nameAr: 'الرتبة الحالية', type: 'text', required: true },
          { name: 'New Rank', nameAr: 'الرتبة الجديدة', type: 'text', required: true },
          { name: 'Demotion Reason', nameAr: 'سبب التخفيض', type: 'text', required: true },
          { name: 'Effective Date', nameAr: 'تاريخ السريان', type: 'date', required: true }
        ]
      }
    ]
  },
  {
    id: 'termination',
    name: 'Termination / Separation',
    nameAr: 'إنهاء الخدمة',
    subcategories: [
      {
        id: 'voluntary-separation',
        name: 'Voluntary Separation',
        nameAr: 'إنهاء خدمة بناءً على طلب',
        fields: [
          { name: 'Separation Date', nameAr: 'تاريخ إنهاء الخدمة', type: 'date', required: true },
          { name: 'Reason for Request', nameAr: 'سبب الطلب', type: 'text', required: true }
        ]
      },
      {
        id: 'disciplinary-termination',
        name: 'Disciplinary Termination',
        nameAr: 'إنهاء خدمة تأديبي',
        fields: [
          { name: 'Termination Date', nameAr: 'تاريخ إنهاء الخدمة', type: 'date', required: true },
          { name: 'Disciplinary Reason', nameAr: 'السبب التأديبي', type: 'text', required: true }
        ]
      },
      {
        id: 'early-retirement',
        name: 'Early Retirement',
        nameAr: 'تقاعد مبكر',
        fields: [
          { name: 'Retirement Date', nameAr: 'تاريخ التقاعد', type: 'date', required: true },
          { name: 'Service Years', nameAr: 'سنوات الخدمة', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistical Memos',
    nameAr: 'مذكرات لوجستية',
    subcategories: [
      {
        id: 'logistics-support',
        name: 'Request for Logistics Support',
        nameAr: 'طلب دعم لوجستي',
        fields: [
          { name: 'Support Type', nameAr: 'نوع الدعم', type: 'text', required: true },
          { name: 'Required Date', nameAr: 'التاريخ المطلوب', type: 'date', required: true },
          { name: 'Justification', nameAr: 'المبرر', type: 'text', required: true }
        ]
      },
      {
        id: 'special-equipment',
        name: 'Request for Special Equipment',
        nameAr: 'طلب معدات خاصة',
        fields: [
          { name: 'Equipment Type', nameAr: 'نوع المعدات', type: 'text', required: true },
          { name: 'Quantity', nameAr: 'الكمية', type: 'text', required: true },
          { name: 'Purpose', nameAr: 'الغرض', type: 'text', required: true }
        ]
      },
      {
        id: 'maintenance-memo',
        name: 'Maintenance Memo',
        nameAr: 'مذكرة صيانة',
        fields: [
          { name: 'Equipment/Facility', nameAr: 'المعدة/المنشأة', type: 'text', required: true },
          { name: 'Maintenance Type', nameAr: 'نوع الصيانة', type: 'select', options: ['وقائية', 'إصلاحية', 'طارئة'], required: true },
          { name: 'Scheduled Date', nameAr: 'التاريخ المجدول', type: 'date', required: true }
        ]
      }
    ]
  },
  {
    id: 'administrative',
    name: 'Administrative',
    nameAr: 'مذكرات إدارية عامة',
    subcategories: [
      {
        id: 'update-personal-records',
        name: 'Update Personal Records',
        nameAr: 'تحديث بيانات شخصية',
        fields: [
          { name: 'Record Type', nameAr: 'نوع البيانات', type: 'text', required: true },
          { name: 'New Information', nameAr: 'المعلومات الجديدة', type: 'text', required: true }
        ]
      },
      {
        id: 'unit-data-change',
        name: 'Change of Unit Data',
        nameAr: 'تعديل بيانات الوحدة',
        fields: [
          { name: 'Data Field', nameAr: 'حقل البيانات', type: 'text', required: true },
          { name: 'New Value', nameAr: 'القيمة الجديدة', type: 'text', required: true }
        ]
      },
      {
        id: 'general-directive',
        name: 'General Directive Memo',
        nameAr: 'مذكرة توجيهية عامة',
        fields: [
          { name: 'Directive Subject', nameAr: 'موضوع التوجيه', type: 'text', required: true },
          { name: 'Implementation Date', nameAr: 'تاريخ التنفيذ', type: 'date', required: true }
        ]
      }
    ]
  },
  {
    id: 'training',
    name: 'Training & Development',
    nameAr: 'التدريب والتطوير',
    subcategories: [
      {
        id: 'training-approval',
        name: 'Training Approval',
        nameAr: 'موافقة على برنامج تدريبي',
        fields: [
          { name: 'Training Program', nameAr: 'البرنامج التدريبي', type: 'text', required: true },
          { name: 'Training Duration', nameAr: 'مدة التدريب', type: 'text', required: true },
          { name: 'Training Location', nameAr: 'مكان التدريب', type: 'text', required: true }
        ]
      },
      {
        id: 'course-nomination',
        name: 'Nomination for Course',
        nameAr: 'ترشيح لدورة',
        fields: [
          { name: 'Course Name', nameAr: 'اسم الدورة', type: 'text', required: true },
          { name: 'Course Date', nameAr: 'تاريخ الدورة', type: 'date', required: true },
          { name: 'Nomination Reason', nameAr: 'سبب الترشيح', type: 'text', required: true }
        ]
      },
      {
        id: 'training-evaluation',
        name: 'Training Evaluation',
        nameAr: 'مذكرة تقييم تدريب',
        fields: [
          { name: 'Training Program', nameAr: 'البرنامج التدريبي', type: 'text', required: true },
          { name: 'Evaluation Score', nameAr: 'درجة التقييم', type: 'select', options: ['ممتاز', 'جيد جداً', 'جيد', 'مقبول'], required: true },
          { name: 'Recommendations', nameAr: 'التوصيات', type: 'text', required: false }
        ]
      }
    ]
  },
  {
    id: 'financial',
    name: 'Financial',
    nameAr: 'مذكرات مالية',
    subcategories: [
      {
        id: 'disbursement',
        name: 'Disbursement of Entitlements',
        nameAr: 'صرف مستحقات',
        fields: [
          { name: 'Entitlement Type', nameAr: 'نوع المستحقات', type: 'text', required: true },
          { name: 'Amount', nameAr: 'المبلغ', type: 'text', required: true },
          { name: 'Payment Date', nameAr: 'تاريخ الصرف', type: 'date', required: true }
        ]
      },
      {
        id: 'exceptional-bonus',
        name: 'Request for Exceptional Bonus',
        nameAr: 'طلب مكافأة استثنائية',
        fields: [
          { name: 'Bonus Reason', nameAr: 'سبب المكافأة', type: 'text', required: true },
          { name: 'Requested Amount', nameAr: 'المبلغ المطلوب', type: 'text', required: true },
          { name: 'Achievement Details', nameAr: 'تفاصيل الإنجاز', type: 'text', required: true }
        ]
      },
      {
        id: 'financial-settlement',
        name: 'Financial Settlement',
        nameAr: 'تسوية مالية',
        fields: [
          { name: 'Settlement Type', nameAr: 'نوع التسوية', type: 'text', required: true },
          { name: 'Settlement Amount', nameAr: 'مبلغ التسوية', type: 'text', required: true },
          { name: 'Settlement Date', nameAr: 'تاريخ التسوية', type: 'date', required: true }
        ]
      }
    ]
  },
  {
    id: 'special',
    name: 'Special Memos',
    nameAr: 'مذكرات خاصة',
    subcategories: [
      {
        id: 'top-secret',
        name: 'Top Secret',
        nameAr: 'سرية للغاية',
        fields: [
          { name: 'Classification Level', nameAr: 'مستوى السرية', type: 'select', options: ['سري للغاية', 'سري', 'محدود التداول'], required: true },
          { name: 'Subject Matter', nameAr: 'موضوع المذكرة', type: 'text', required: true },
          { name: 'Security Clearance Required', nameAr: 'التصريح الأمني المطلوب', type: 'text', required: true }
        ]
      },
      {
        id: 'humanitarian-case',
        name: 'Humanitarian Case',
        nameAr: 'مذكرة إنسانية',
        fields: [
          { name: 'Case Description', nameAr: 'وصف الحالة', type: 'text', required: true },
          { name: 'Requested Action', nameAr: 'الإجراء المطلوب', type: 'text', required: true },
          { name: 'Urgency Level', nameAr: 'مستوى الأولوية', type: 'select', options: ['عاجل جداً', 'عاجل', 'عادي'], required: true }
        ]
      },
      {
        id: 'special-directive',
        name: 'Special Directive',
        nameAr: 'مذكرة توجيهية استثنائية',
        fields: [
          { name: 'Directive Type', nameAr: 'نوع التوجيه', type: 'text', required: true },
          { name: 'Special Circumstances', nameAr: 'الظروف الاستثنائية', type: 'text', required: true },
          { name: 'Implementation Timeline', nameAr: 'الجدول الزمني للتنفيذ', type: 'text', required: true }
        ]
      }
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    nameAr: 'مخصص',
    subcategories: [
      {
        id: 'custom-memo',
        name: 'Custom Memo',
        nameAr: 'مذكرة مخصصة',
        fields: [
          { name: 'Memo Subject', nameAr: 'موضوع المذكرة', type: 'text', required: true },
          { name: 'Custom Field 1', nameAr: 'حقل مخصص 1', type: 'text', required: false },
          { name: 'Custom Field 2', nameAr: 'حقل مخصص 2', type: 'text', required: false }
        ]
      }
    ]
  }
];

// Mock Memos Database
export const mockMemos: Memo[] = [
  {
    id: '1',
    number: 1001,
    title: 'Annual Leave Request for Ahmed Al-Rashid',
    titleAr: 'طلب إجازة اعتيادية لأحمد الراشد',
    content: 'Annual leave granted from 2024-01-15 to 2024-01-30',
    contentAr: 'تم منح إجازة اعتيادية من 2024-01-15 إلى 2024-01-30',
    category: 'leaves',
    categoryAr: 'الإجازات',
    subcategory: 'annual-leave',
    subcategoryAr: 'إجازة اعتيادية',
    createdBy: 'Fahd Al-Mutairi',
    createdByAr: 'فهد المطيري',
    createdFor: 'Ahmed Al-Rashid',
    createdForAr: 'أحمد الراشد',
    createdDate: '2024-01-10',
    lastModified: '2024-01-10',
    status: 'sent',
    priority: 'medium',
    additionalFields: {
      'Leave Start Date': '2024-01-15',
      'Leave End Date': '2024-01-30',
      'Leave Duration': '15 days'
    }
  },
  {
    id: '2',
    number: 1002,
    title: 'Internal Transfer for Mohammed Al-Saud',
    titleAr: 'نقل داخلي لمحمد السعود',
    content: 'Internal transfer to Training Division effective 2024-02-01',
    contentAr: 'نقل داخلي إلى شعبة التدريب اعتباراً من 2024-02-01',
    category: 'transfers',
    categoryAr: 'النقل',
    subcategory: 'internal-transfer',
    subcategoryAr: 'نقل داخلي',
    createdBy: 'Fahd Al-Mutairi',
    createdByAr: 'فهد المطيري',
    createdFor: 'Mohammed Al-Saud',
    createdForAr: 'محمد السعود',
    createdDate: '2024-01-20',
    lastModified: '2024-01-20',
    status: 'sent',
    priority: 'high',
    additionalFields: {
      'New Unit': 'Training Division',
      'Transfer Date': '2024-02-01',
      'Transfer Reason': 'Administrative requirement'
    }
  },
  {
    id: '3',
    number: 1003,
    title: 'Promotion for Khalid Al-Otaibi',
    titleAr: 'ترقية خالد العتيبي',
    content: 'Promotion to Major effective 2024-03-01',
    contentAr: 'ترقية إلى رتبة رائد اعتباراً من 2024-03-01',
    category: 'promotions',
    categoryAr: 'الترقيات',
    subcategory: 'due-promotion',
    subcategoryAr: 'ترقية مستحقة',
    createdBy: 'Fahd Al-Mutairi',
    createdByAr: 'فهد المطيري',
    createdFor: 'Khalid Al-Otaibi',
    createdForAr: 'خالد العتيبي',
    createdDate: '2024-02-15',
    lastModified: '2024-02-15',
    status: 'draft',
    priority: 'high',
    additionalFields: {
      'New Rank': 'Major',
      'Promotion Date': '2024-03-01',
      'Service Years': '8 years'
    }
  }
];

// Mock Analytics Data
export const mockStats: MemoStats = {
  totalMemos: 156,
  memosThisMonth: 24,
  memosThisWeek: 8,
  draftMemos: 12,
  sentMemos: 128,
  archivedMemos: 16,
  topCategories: [
    { category: 'leaves', categoryAr: 'الإجازات', count: 45 },
    { category: 'transfers', categoryAr: 'النقل', count: 32 },
    { category: 'promotions', categoryAr: 'الترقيات', count: 28 },
    { category: 'evaluations', categoryAr: 'التقييمات', count: 21 },
    { category: 'disciplinary', categoryAr: 'العقوبات', count: 18 }
  ],
  topCreators: [
    { name: 'Fahd Al-Mutairi', nameAr: 'فهد المطيري', count: 67 },
    { name: 'Ahmed Al-Rashid', nameAr: 'أحمد الراشد', count: 34 },
    { name: 'Mohammed Al-Saud', nameAr: 'محمد السعود', count: 28 },
    { name: 'Khalid Al-Otaibi', nameAr: 'خالد العتيبي', count: 19 }
  ],
  recentActivity: [
    {
      action: 'Created memo',
      actionAr: 'إنشاء مذكرة',
      memo: 'Leave Request #1003',
      memoAr: 'طلب إجازة رقم 1003',
      time: '2 hours ago',
      user: 'Fahd Al-Mutairi',
      userAr: 'فهد المطيري'
    },
    {
      action: 'Sent memo',
      actionAr: 'إرسال مذكرة',
      memo: 'Transfer Order #1002',
      memoAr: 'أمر نقل رقم 1002',
      time: '4 hours ago',
      user: 'Ahmed Al-Rashid',
      userAr: 'أحمد الراشد'
    },
    {
      action: 'Edited memo',
      actionAr: 'تعديل مذكرة',
      memo: 'Promotion Notice #1001',
      memoAr: 'إشعار ترقية رقم 1001',
      time: '1 day ago',
      user: 'Mohammed Al-Saud',
      userAr: 'محمد السعود'
    }
  ],
  monthlyData: [
    { month: 'Jan', count: 18 },
    { month: 'Feb', count: 22 },
    { month: 'Mar', count: 25 },
    { month: 'Apr', count: 19 },
    { month: 'May', count: 28 },
    { month: 'Jun', count: 24 },
    { month: 'Jul', count: 20 }
  ]
};

// Database utility functions
export const findOfficerByName = (name: string): Officer | undefined => {
  return mockOfficers.find(officer => 
    officer.name.toLowerCase().includes(name.toLowerCase()) ||
    officer.nameAr.includes(name)
  );
};

export const findOfficerByEmployeeId = (employeeId: string): Officer | undefined => {
  return mockOfficers.find(officer => officer.employeeId === employeeId);
};

export const getAllOfficers = (): Officer[] => {
  return mockOfficers;
};

export const getAllMemos = (): Memo[] => {
  return mockMemos;
};

export const getMemosByCategory = (category: string): Memo[] => {
  return mockMemos.filter(memo => memo.category === category);
};

export const getMemosByStatus = (status: string): Memo[] => {
  return mockMemos.filter(memo => memo.status === status);
};

export const getStats = (): MemoStats => {
  return mockStats;
};

export const getNextMemoNumber = (): number => {
  const maxNumber = Math.max(...mockMemos.map(memo => memo.number));
  return maxNumber + 1;
};

export const saveMemo = (memo: Omit<Memo, 'id'>): Memo => {
  const newMemo = {
    ...memo,
    id: (mockMemos.length + 1).toString()
  };
  mockMemos.push(newMemo);
  return newMemo;
};

export const updateMemo = (id: string, updates: Partial<Memo>): Memo | undefined => {
  const index = mockMemos.findIndex(memo => memo.id === id);
  if (index !== -1) {
    mockMemos[index] = { ...mockMemos[index], ...updates };
    return mockMemos[index];
  }
  return undefined;
};