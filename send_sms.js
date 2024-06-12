const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { number, message } = req.query;

    const apiUrl = `https://api-freesms.replit.app/send_sms?number=${encodeURIComponent(number)}&message=${encodeURIComponent(message)}`;

    console.log(`Making request to API URL: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log(`API response status: ${response.status}`);
        console.log(`API response data: ${JSON.stringify(data)}`);

        if (response.ok) {
            res.status(200).json({ success: true, data });
        } else {
            res.status(response.status).json({ success: false, error: data });
        }
    } catch (error) {
        console.error('Error fetching from API:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
