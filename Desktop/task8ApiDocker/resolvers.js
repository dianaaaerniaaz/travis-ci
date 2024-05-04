const request = require('request');

const resolvers = {
  Query: {
    getWeatherByCityName: async (_, { city }, __) => {
      // Формируем URL для запроса к OpenWeatherAPI
      const apiKey = "5e491cce53f6f685f3993d9c9060fdf7";
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      // Выполняем запрос к OpenWeatherAPI
      return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            const weatherData = JSON.parse(body);
            // Формируем объект данных о погоде для возврата
            const weather = {
              temperature: weatherData.main.temp,
              description: weatherData.weather[0].description
            };
            // Возвращаем данные о погоде
            resolve(weather);
          } else {
            // Если возникла ошибка при запросе к API, возвращаем null
            resolve(null);
          }
        });
      });
    }
  }
};

module.exports = resolvers;
