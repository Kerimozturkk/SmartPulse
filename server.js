const express = require('express');
const cors = require('cors');
const { response } = require('express');
const axios = require('axios').default;

const API_PORT = 5000;
const app = express();

app.use(cors());
const buGun = new Date();

const formatDate = (date) => { // Zaman formatı düzenleyen fonksiyon
    const [dateStr] = new Date(date).toISOString().split('T')
    return dateStr
}

app.get('/api', async function (req, res) {
    const config = {
        method: 'get',
        url: `http://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=${formatDate(buGun)}&startDate=${formatDate(buGun)}`
        //url: `https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-04-02&startDate=2022-04-02`
    }

    let data = await axios(config).then(data => data.data.body.intraDayTradeHistoryList);
    res.send({ result: data })

});




app.listen(API_PORT, () => console.log(`Dinlenen port ${API_PORT}`));