
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
export interface PaymentDetailsModel{
    amountSent: number,
    receiver: string,
    date: string,
    time: string,
    category: string,
    transactionId: number,
    remainingBalance: number
}
export interface UserDetailsModel {
    username: string,
    email:string
}
