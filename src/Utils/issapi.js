const API_URL = "https://api.open-notify.org/iss-now.json";
const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(attempt = 0) {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (attempt < MAX_RETRIES) {
      const delay = BASE_DELAY * Math.pow(2, attempt);
      await sleep(delay);
      return fetchWithRetry(attempt + 1);
    }
    throw error;
  }
}

export async function fetchISSPosition() {
  const data = await fetchWithRetry();

  // Open-Notify API doesn't provide altitude, so we use the average ISS altitude
  const averageAltitude = 408; // km

  return {
    latitude: parseFloat(data.iss_position.latitude),
    longitude: parseFloat(data.iss_position.longitude),
    altitude: averageAltitude,
  };
}
