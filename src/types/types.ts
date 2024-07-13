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
