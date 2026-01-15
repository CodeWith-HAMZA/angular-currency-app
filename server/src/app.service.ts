 
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  
  // as it's a small app, i'm directly importing the .env content, we are setting the constants here, inn future it'll go inside env.ts or constants.ts (any constants file)
  constructor(private configService: ConfigService) {} 

  get apiKey(): string {
    return this.configService.get<string>('FREECURRENCY_API_KEY') ?? '';
  }

  get baseUrl(): string {
    return this.configService.get<string>('FREECURRENCY_BASE_URL') ?? '';
  }


  async getCurrencies(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/currencies`, {
        headers: {
          'apikey': this.apiKey,
        },
      });
      return response.data;
    } catch (error) {

      throw new Error('Failed to fetch currencies from API.');
    }
  }

  async getHistoricalRates(date: string, base_currency: string): Promise<any> {
     
    try {
      const response = await axios.get(`${this.baseUrl}/historical`, {
        params: {
          apikey: this.apiKey,
          date,
          base_currency,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch historical rates from API.');
    }
  }

  async getLatestRates(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/latest`, {
        params: { apikey: this.apiKey },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch latest rates from API.');
    }
  }
}
