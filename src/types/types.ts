// common
export type ErrorType = {
  error: string;
};

// notes
export type dayNotesType = {
  id: string;
  date: number;
  month: number;
  notes: string[];
};

export type noteType = {
  id: string;
  text: string;
  title: string;
  createdAt: number;
  updatedAt: number;
};

export type editedNoteType = {
  id?: string;
  text: string;
  title: string;
  createdAt?: number;
  updatedAt?: number;
};

// tasks
export type taskType = {
  id: string;
  sort: number;
  text: string;
  priority: number;
  deadline: number;
  createdAt: number;
  updatedAt: number;
  isCompleted: boolean;
};

export type editedTaskType = {
  id?: string;
  sort: number;
  text: string;
  priority: number;
  deadline: number;
  createdAt?: number;
  updatedAt?: number;
  isCompleted: boolean;
};

// targets
export type editedTargetType = editedTaskType & {};

export type targetType = taskType & {};

// finance
export type displayTypeType = {
  id: number;
  icon: JSX.Element;
  title: string;
};

export type finTransCatType = {
  id: string;
  name: string;
};

export type finTransCategoryType = {
  id: string;
  type: number;
  name: string;
  createdAt: number;
  updatedAt: number;
};

export type finTransDataType = {
  num: number;
  date: number;
  desc: string;
  type: number;
  sum: number | string;
  category: { id: string; name: string } | undefined;
};

export type finTransCategoryDataType = {
  category: string;
  data: finTransDataType[];
};

export type transPeriodType = {
  startDate: number;
  finishDate: number;
  id: number;
  name: string;
};

export type transCategoryType = {
  id: string;
  name: string;
};

export type finChartType = {
  id: number;
  name: string;
};

export type getTransPeriodType = {
  typeId: number;
};

export type finTransType = {
  id: string;
  sum: number;
  num: number;
  text: string;
  date: number;
  desc: string;
  type: number;
  createdAt: number;
  updatedAt: number;
  category: {
    id: string;
    name: string;
  };
};

// common
export type sortType = {
  id: number;
  name: string;
};

export type AItemType = {
  id: string;
  sort: number;
  text: string;
  priority: number;
  deadline: number;
  createdAt: number;
  updatedAt: number;
  isCompleted: boolean;
};

// login

export type loginDataType = {
  email: string;
  password: string;
};

export type regDataType = {
  email: string;
  password: string;
};

export type resendDataType = {
  email: string;
};

// achive

export type achiveType = {
  id: string;
  sort: number;
  text: string;
  date: number;
  title: string;
};

export type editedAchiveType = {
  id?: string;
  sort: number;
  text: string;
  date: number;
};

// listPage

// export type ListPageType = {
//   id: string;
//   sort: number;
//   name: string;
//   menuTypeId: number;
//   icon: null | string;
//   withDeadline: boolean;
//   withPriority: boolean;
//   withCompleted: boolean;
// };

export type dataUpdateListPageType = {
  id: null | string;
  sort: number;
  name: string;
  menuTypeId: number;
  withDeadline: boolean;
  withPriority: boolean;
  withCompleted: boolean;
  icon: null | string | File;
};

// List new

export type SListItemType = {
  id: string;
  sort: number;
  text: string;
  desc: string;
  menuId: string;
  updatedAt: number;
};

export type SListItemEditType = {
  id?: string;
  sort: number;
  text: string;
  desc: string;
  menuId: string;
  updatedAt?: number;
};

export type ListItemType = {
  id: string;
  sort: number;
  text: string;
  menuId: string;
  updatedAt: number;
  isCompleted: boolean;
  deadline: null | number;
  priority: null | number;
};

export type ListItemEditType = {
  id?: string;
  sort: number;
  text: string;
  menuId?: string;
  updatedAt?: number;
  isCompleted: boolean;
  deadline: null | number;
  priority: null | number;
};

// List new end

export type MenuItemType = {
  id: string;
  name: string;
  sort: number;
  icon: string;
  typeId: number;
};

export type MenuItemEditType = {
  name: string;
  sort: number;
  icon: string;
  id: string | null;
  typeId: number | null;
};

// diagram new

export type DiagramActiveViewType = {
  id: number;
  icon: JSX.Element;
  title: string;
};

export type DiagramSettingsListType = {
  chapters: {
    id: string;
    name: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
  periods: {
    id: number;
    name: string;
  }[];
  views: DiagramActiveViewType[];
};

export type DiagramActiveSettingsType = {
  chapter: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  period: {
    id: number;
    name: string;
  };
  view: DiagramActiveViewType;
};

export type DiagramDataItemType = {
  id: string;
  desc: string;
  date: number;
  value: number;
  chapterId: string;
  categoryId: string;
};

export type DiagramDataEditItemType = {
  id?: string;
  desc: string;
  date: number;
  value: number;
  chapterId: string;
  categoryId: string;
};

export type DiagramDataPeriodType = {
  id?: number;
  name?: string;
  startDate: number;
  finishDate: number;
};

export type DiagramDataType = {
  settingsList: DiagramSettingsListType;
  activeSettings: DiagramActiveSettingsType;
  updateCategoryList: (cat: any, key: string) => void;
  changeActiveSettings: (key: string, val: any) => void;
};

export type TransformDiagramDataItem = {
  category: string;
  data: DiagramDataItemType[];
};

export type DiagramPieChartDataType = {
  category: string;
  value: number;
};

// Calendar

export type CalendarDataType = {
  id: string;
  menuId: string;
  deadlineIds: string[];
  deadlines: ListItemType[];
};

export type CalendarNoteType = {
  id: string;
  date: number;
  note: string;
};

export type CalendarTaskType = {
  id: string;
  text: string;
  dayIds: number[];
};

export type CalendarEditTaskType = {
  id?: string;
  text: string;
  menuId?: string;
  dayIds?: number[];
};

export type EditCalendarDataType = {
  id?: string;
  menuId?: string;
  deadlineIds: string[];
  tasks: CalendarTaskType[];
  deadlines: ListItemType[];
  dayDataList: CalendarDayDataType[];
};

export type DataDayType = {
  id: number;
  date?: Date;
  tasks?: CalendarTaskType[];
  deadlines?: ListItemType[];
  dayData?: CalendarDayDataType;
};

export type CalendarDayDataType = {
  id: string;
  date: number;
  note: string;
  completedDayTaskIds: string[];
};

export type DataEditDayType = {
  id: number;
  date: number;
  note: string;
  completedDayTaskIds: string[];
  completedDeadlines: string[];
};

// graph

export type GraphDataEditItemType = {
  id?: string;
  desc: string;
  date: number;
  value: number;
  chapterId: string;
};

export type GraphDataItemType = {
  id: string;
  desc: string;
  date: number;
  value: number;
  chapterId: string;
};

export type GraphDataType = {
  name: string;
  value: number;
};

export type GraphSettingsListType = {
  chapters: {
    id: string;
    name: string;
  }[];
  periods: {
    id: number;
    name: string;
  }[];
  views: DiagramActiveViewType[];
};

export type GraphActiveSettingsType = {
  chapter: {
    id: string;
    name: string;
  };
  period: {
    id: number;
    name: string;
  };
  view: DiagramActiveViewType;
};
