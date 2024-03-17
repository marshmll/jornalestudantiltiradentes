function createOpenWeatherClient() {
  async function getCurrentWeatherData() {
    const token = process.env.NEXT_PUBLIC_OPENWEATHER_TOKEN;

    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        long: pos.coords.longitude.toFixed(1),
        lat: pos.coords.latitude.toFixed(1),
      };
    };

    const coords = await getCoords();
    if (!coords) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${token}&lang=pt_br`
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao fazer a requisição ao servidor: ${response.status}`
        );
      }

      const data = await response.json();
      console.log(data);
      return data;

    } catch (error) {
      throw new Error(`Erro ao processar requisição: ${error}`);
    }
  }

  return Object.freeze({
    getCurrentWeatherData,
  });
}

const openWeatherClient = createOpenWeatherClient();
export default openWeatherClient;
