  import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  
  constructor(private readonly appService: AppService) {}
 
  @Get('api/currencies')
  async getCurrencies() {
    return await this.appService.getCurrencies();
  }

  @Get('api/historical')
  async getHistoricalRatesQuery(
    @Query('date') date: string,
    @Query('base_currency') base_currency: string
  ) { 
    return await this.appService.getHistoricalRates(date, base_currency);
  }

  @Get('api/latest')
  async getLatestRates() {
    return await this.appService.getLatestRates();
  }
}
