//index.js
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import request from 'request';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
const app = express();
const PORT = 4000;
const apiKey = "5e491cce53f6f685f3993d9c9060fdf7";
const typeDefs = gql`
  type Weather {
    temperature: Float
    description: String
  }

  type Query {
    getWeatherByCityName(city: String!): Weather
  }
`;
const resolvers = {
  Query: {
    getWeatherByCityName: (_, { city }) => {
      return new Promise((resolve, reject) => {
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
        request(url, function (err, response, body) {
          if (err) {
            reject("Error in fetch weather of city");
          } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
              reject("Error, please try again");
            } else {
              let temperature = fToC(weather.main.temp);
              let description = weather.weather[0].description;
              resolve({ temperature, description });
            }
          }
        });
      });
    }
  }
};
function fToC(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5 / 9);
}
export { fToC };
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ ...req, graphqlApiUri: process.env.GRAPHQL_API_URI }), plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] });
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' }); 
}
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { weather: null, error: null });
});
app.post('/', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: "Error in fetch weather of city" });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      } else {
        let weatherText = `It's ${fToC(weather.main.temp)} degree Celsius Temperature in ${city}`;
        res.render('index', { weather: weatherText, error: null });
      }
    }
  });
});
startServer().then(() => {
  app.listen(PORT, () => {
    console.log("App is listening on port 4000");
  });
});
