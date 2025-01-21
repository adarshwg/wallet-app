export interface RecentContactsModel extends Array<string> {}
export interface ContactTransactionsModel extends Array<TransactionsModel>{}
export interface CurrentMonthTransactionsModel extends Array<TransactionsModel>{}
export interface PaginatedTransactionsModel {
    items: CurrentMonthTransactionsModel,
    total:number,
    page:number,
    size:number,
    pages:number
}
export interface TransactionsModel {
    amount:number,
    category: string,
    day: number,
    month: number,
    year:number,
    hours:number,
    minutes:number,
    receiver:string,
    sender:string,
    transaction_id:number
}