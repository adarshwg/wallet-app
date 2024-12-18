export interface WalletBalanceModel{
    walletBalance: string
}
export interface TransactionModel {
    amount: number,
    category: string,
    day: number,
    hours:number,
    minutes: number,
    month: number,
    receiver:string,
    sender:string,
    transaction_id : number,
    year: number
}