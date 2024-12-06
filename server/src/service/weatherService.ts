import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  wind: number;
  humidity: number;
  constructor(temperature: number, wind: number, humidity: number) {
    this.temperature = temperature;
    this.wind = wind;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  city = '';
  APIKey = 'a9e08f963d176fd31cf479f868a46a96';
  baseURL = 'https://api.openweathermap.org/';
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const location = await fetch(this.baseURL + query + '&appid=' + this.APIKey);
    return location.json();
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `geo/1.0/direct?q=${city}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
    const query = this.buildGeocodeQuery(city);
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const weatherData = await fetch(this.baseURL + query + '&appid=' + this.APIKey);
    return weatherData.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const temperature = response.termperature;
    const wind = response.wind;
    const humidity = response.humidity;
    const weather = new Weather(temperature, wind, humidity);
    return weather;
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  //   const forecastArray = new Weather(currentWeather.temperature, currentWeather.wind, currentWeather.humidity);
  //   return forecastArray;
  // }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    
    return currentWeather;
  }
}

export default new WeatherService();
