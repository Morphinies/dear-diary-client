const URI = process.env.REACT_APP_API_URI;

const Endpoints = {
  AUTH: {
    LOGIN: URI + 'auth/login',
    LOGOUT: URI + 'auth/logout',
    REFRESH: URI + 'auth/refresh',
    GET_USERS: URI + 'auth/users',
    CHECK_AUTH: URI + 'auth/is_auth',
    REGISTR: URI + 'auth/registration',
    RESEND_LINK: URI + 'auth/resend_link',
  },
  DIAGRAM: {
    DEL_DATA_ITEM: URI + 'diagram/del_item',
    GET_DATA_LIST: URI + 'diagram/data_list',
    EDIT_DATA_ITEM: URI + 'diagram/update_item',

    DEL_CATEGORY: URI + 'diagram/del_category',
    EDIT_CATEGORY: URI + 'diagram/update_category',
    GET_CATEGORY_LIST: URI + 'diagram/category_list',

    DEL_CHAPTER: URI + 'diagram/del_chapter',
    EDIT_CHAPTER: URI + 'diagram/update_chapter',
    GET_CHAPTER_LIST: URI + 'diagram/chapter_list',
  },
  GRAPH: {
    DEL_DATA_ITEM: URI + 'graph/del_item',
    GET_DATA_LIST: URI + 'graph/data_list',
    EDIT_DATA_ITEM: URI + 'graph/update_item',

    DEL_CHAPTER: URI + 'graph/del_chapter',
    EDIT_CHAPTER: URI + 'graph/update_chapter',
    GET_CHAPTER_LIST: URI + 'graph/chapter_list',
  },
  LIST: {
    GET_LIST: URI + 'list',
    UPDATE_ITEM: URI + 'list/item',
    DELETE_ITEM: URI + 'list/item',
    UPDATE_ITEM_SORT: URI + 'list/item_sort',
    COMPLETE_ITEM: URI + 'list/item_complete',
  },
  S_LIST: {
    GET_LIST: URI + 's_list',
    UPDATE_ITEM: URI + 's_list/item',
    DELETE_ITEM: URI + 's_list/item',
    UPDATE_ITEM_SORT: URI + 's_list/item_sort',
  },
  FILES: {
    UPDATE_FILE: URI + 'files/update',
    DELETE_FILE: URI + 'files/delete',
  },
  MENU: {
    UPDATE: URI + 'menu',
    GET_ITEM: URI + 'menu',
    GET_LIST: URI + 'menu/list',
  },
  CALENDAR: {
    DEL: URI + 'calendar/data',
    UPDATE: URI + 'calendar/data',
    GET_DATA: URI + 'calendar/data',
    UPDATE_DAY: URI + 'calendar/day_data',
    UPDATE_DAY_TASK: URI + 'calendar/day_task',
  },
};

export default Endpoints;
