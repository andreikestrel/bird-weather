const apiKey = "18b4c7f6917197e98b59e2074e9f7e06";

export const fetchWeatherData = (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados", error);
    });
};
