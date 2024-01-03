const router = require('express').Router();
const apiKey = process.env.API_KEY;

router.post('/getWeather', async (req, res) => {
    try {
        const { cities } = req.body;
        if (!cities || !Array.isArray(cities)) {
            return res.status(400).json({ error: 'Invalid input. Please provide an array of cities.' });
        }

        const weatherData = {};
        const requests = cities.map(async (city) => {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6227a88e2f2ae7f485e5fff2e2f80e8b`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (response.ok) {
                const temperature = `${data.main.temp}°C`;
                weatherData[city] = temperature;
            } else {
                weatherData[city] = 'Not available';
            }
        });

        await Promise.all(requests);
        return res.status(200).json({ weather: weatherData });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
});

module.exports = router;