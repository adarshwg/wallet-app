export interface WalletBalanceModel{
    walletBalance: string
}
export interface SendMoneyModel{
    amountSent:number,
    receiver:string,
    date:string,
    category:string,
    transactionId:number,
    remainingBalance:WalletBalanceModel
}