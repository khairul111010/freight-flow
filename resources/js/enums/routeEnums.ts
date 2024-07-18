export enum AuthRoutesEnum {
    LOGIN = '/login',
    LOGOUT = '/logout',
}

export enum  AppRoutesEnum {
    DASHBOARD = '/',
    CUSTOMERS = '/customers',
    CUSTOMERS_ADD = '/customers-add',
    CUSTOMERS_EDIT = '/customers-edit/:id',
    VENDORS = '/vendors',
    VENDORS_ADD = '/vendors-add',
    VENDORS_EDIT = '/vendors-edit/:id',
    SETTINGS = '/settings',
}

export enum ErrorRoutesEnum {
    NOT_FOUND = '/404',
}
