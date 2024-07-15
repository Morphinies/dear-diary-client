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
  NOTES: {
    DEL_NOTE: URI + 'notes/note_del',
    UPDATE_NOTE: URI + 'notes/note_update',
    GET_NOTE_LIST: URI + 'notes/note_list',
    GET_DAY_NOTES: URI + 'notes/day_notes',
    EDIT_DAY_NOTES: URI + 'notes/day_notes',
    GET_MONTH_NOTES: URI + 'notes/month_notes',
  },
  FINANCE: {
    DEL_TRANSACTION: URI + 'finance/trans_del',
    ADD_TRANSACTION: URI + 'finance/trans_update',
    GET_TRANSACTION_LIST: URI + 'finance/trans_list',
    DEL_CATEGORY: URI + 'finance/trans_category_del',
    ADD_CATEGORY: URI + 'finance/trans_category_update',
    GET_CATEGORY_LIST: URI + 'finance/trans_category_list',
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
  LIST: {
    GET_LIST: URI + 'list',
    UPDATE_ITEM: URI + 'list/item',
    DELETE_ITEM: URI + 'list/item',
    UPDATE_ITEM_SORT: URI + 'list/item_sort',
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
};

export default Endpoints;
