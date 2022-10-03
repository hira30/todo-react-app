import { useState, useEffect } from "react";

type Forecast = {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
};

export const FetchData = () => {
  const [forecasts, setForecasts] = useState<Forecast[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchForecastData() {
      const response = await fetch("weatherforecast");
      const data = await response.json();
      setForecasts(data);
      setLoading(false);
    }
    fetchForecastData();
  }, []);

  const renderForecastsTable = () => {
    return (
      <table className="table table-striped" aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 id="tabelLabel">Weather forecast</h1>
      <p>サーバーからデータを取得するコンポーネントのサンプル</p>
      {loading ? <p>Loading...</p> : renderForecastsTable()}
    </div>
  );
};
