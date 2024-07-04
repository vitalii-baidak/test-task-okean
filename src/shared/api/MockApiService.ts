import mockApiData from './mockApiData.json';
import { SalesList, ExpenseList } from "@/shared/api/MockApiService.types";

export default {
  async fetchSalesData(): Promise<SalesList> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockApiData.salesData);
      }, 3000)
    })
  },

  async fetchExpenseData() : Promise<ExpenseList> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockApiData.expenseData);
      }, 5000)
    })
  }
}
