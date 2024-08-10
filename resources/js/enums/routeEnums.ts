export enum AuthRoutesEnum {
    LOGIN = '/login',
    LOGOUT = '/logout',
}

export enum  AppRoutesEnum {
    DASHBOARD = '/',
    CUSTOMERS = '/customers',
    CUSTOMERS_ADD = '/customers/add',
    CUSTOMERS_EDIT = '/customers/edit/:id',
    VENDORS = '/vendors',
    VENDORS_ADD = '/vendors/add',
    VENDORS_EDIT = '/vendors/edit/:id',
    BANK = '/bank',
    BANK_ADD = '/bank/add',
    BANK_EDIT = '/bank/edit/:id',
    BANK_ACCOUNT = '/bank-account',
    BANK_ACCOUNT_ADD = '/bank-account/add',
    BANK_ACCOUNT_EDIT = '/bank-account/edit/:id',
    INVOICE = '/invoice',
    INVOICE_ADD = '/invoice/add',
    INVOICE_EDIT = '/invoice/edit/:id',
    BILL = '/bill',
    BILL_ADD = '/bill/add',
    BILL_EDIT = '/bill/edit/:id',
    SETTINGS = '/settings',
}

export enum ErrorRoutesEnum {
    NOT_FOUND = '/404',
}
