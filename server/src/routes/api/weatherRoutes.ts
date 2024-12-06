import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  try {
    const {city} = req.body;
    if (!city) {
      return res.status(400).json({message: 'Please provide a city name'});
    }
// GET weather data from city name
    const weatherData = WeatherService.getWeatherForCity(city);
// save city to search history
    HistoryService.addCity(city);
    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({error: 'Failed to retrieve weather data'});
  }
});

// GET search history
router.get('/history', async (_, res) => {
  try {
    const cities = await HistoryService.getCities();
    res.json(cities);
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve search history'});
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const {id} = req.params;
    await HistoryService.removeCity(id);
    res.json({message: 'City removed from search history'});
  } catch (error) {
    res.status(500).json({error: 'Failed to remove city from search history'});
  }
});

export default router;
