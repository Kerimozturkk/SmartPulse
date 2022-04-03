import React from 'react';
import { useEffect, useState } from 'react';
import style from './style.module.css'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    getData('/api');
  }, [])

  const formatDate = (date) => {
    const [dateStr] = new Date(date).toISOString().split('T')
    return dateStr
  }
  const getData = async (url) => {
    const newData = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(res => res.json())
    console.log(newData.result)
    setData(newData.result);
  }

  const withPH = (arr) => {
    const newData = arr.filter((item) => item.conract.includes('PH'));
    return newData;
  }

  const groupBy = (arr) => {
    const arr00 = [];
    const arr01 = [];
    const arr02 = [];
    const arr03 = [];
    const arr04 = [];
    const arr05 = [];
    const arr06 = [];
    const arr07 = [];
    const arr08 = [];
    const arr09 = [];
    const arr10 = [];
    const arr11 = [];
    const arr12 = [];
    const arr13 = [];
    const arr14 = [];
    const arr15 = [];
    const arr16 = [];
    const arr17 = [];
    const arr18 = [];
    const arr19 = [];
    const arr20 = [];
    const arr21 = [];
    const arr22 = [];
    const arr23 = [];

    arr.map((item) => {
      switch (item.conract.slice(8)) {
        case '00':
          arr00.push(item);
          break;
        case '01':
          arr01.push(item);
          break;
        case '02':
          arr02.push(item);
          break;
        case '03':
          arr03.push(item);
          break;
        case '04':
          arr04.push(item);
          break;
        case '05':
          arr05.push(item);
          break;
        case '06':
          arr06.push(item);
          break;
        case '07':
          arr07.push(item);
          break;
        case '08':
          arr08.push(item);
          break;
        case '09':
          arr09.push(item);
          break;
        case '10':
          arr10.push(item);
          break;
        case '11':
          arr11.push(item);
          break;
        case '12':
          arr12.push(item);
          break;
        case '13':
          arr13.push(item);
          break;
        case '14':
          arr14.push(item);
          break;
        case '15':
          arr15.push(item);
          break;
        case '16':
          arr16.push(item);
          break;
        case '17':
          arr17.push(item);
          break;
        case '18':
          arr18.push(item);
          break;
        case '19':
          arr19.push(item);
          break;
        case '20':
          arr20.push(item);
          break;
        case '21':
          arr21.push(item);
          break;
        case '22':
          arr22.push(item);
          break;
        case '23':
          arr23.push(item);
          break;
      }
    })

    return [
      arr00, arr01, arr02, arr03, arr04, arr05, arr06, arr07, arr08, arr09, arr10,
      arr11, arr12, arr13, arr14, arr15, arr16, arr17, arr18, arr19, arr20, arr21,
      arr22, arr23
    ]
  }

  const islemler = (arr) => {
    const mainArr = [];
    const toplamIslemTutariArr = [];
    const toplamIslemMiktariArr = [];
    const AgirlikOrtamaFiyatArr = [];
    arr.map((item) => {
      let islemTutari = 0;
      let islemMiktari = 0;
      item.map((subItem) => {
        islemTutari += ((parseFloat(subItem.price) * parseFloat(subItem.quantity)) / 10);
        islemMiktari += (parseFloat(subItem.quantity / 10));
      })
      toplamIslemTutariArr.push(islemTutari);
      toplamIslemMiktariArr.push(islemMiktari);
    })


    for (let i = 0; i < toplamIslemTutariArr.length; i++) {
      const AgirlikOrtamaFiyat = (toplamIslemTutariArr[i] / toplamIslemMiktariArr[i]);
      AgirlikOrtamaFiyatArr.push(AgirlikOrtamaFiyat);
    }

    mainArr.push(toplamIslemMiktariArr);
    mainArr.push(toplamIslemTutariArr);
    mainArr.push(AgirlikOrtamaFiyatArr);
    return mainArr;

  }

  const numberControl = (number) => {
    if (isNaN(number)) {
      number = "0";
    }
    return number
  }

  const tabloOlustur = (arr) => {
    var saat = "";
    const mainArr = [];
    for (let i = 0; i <= new Date().getHours(); i++) {
      if (i.toString().length == 1) {
        saat = `0${i}:00`
      } else {
        saat = `${i}:00`
      }
      const object = { tarih: `${formatDate(new Date())} ${saat} `, toplamIslemMiktari: arr[0][i], toplamIslemTutari: arr[1][i], AgirlikOrtamaFiyat: numberControl(arr[2][i]) };
      mainArr.push(object);
    }
    return mainArr;
  }

  function formatMoney(n) {
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1.').replace(/\.(\d+)$/, ',$1');
  }

  return (
    <div className="App">
      <div className={style.h1}>
        <h1>smartPulse Teknik Mülakat Ödevi</h1>
      </div>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th}>Tarih</th>
            <th className={style.th}>Toplam İşlem Miktari (MWh)</th>
            <th className={style.th}>Toplam İşlem Tutarı (TL)</th>
            <th className={style.th}>Ağırlık Ortalama Fiyat (TL/MWh)</th>
          </tr>
        </thead>
        <tbody>
          {
            tabloOlustur(islemler(groupBy(withPH(data)))).map((item, index) => (
              <tr key={index}>
                <td className={style.td}>{item.tarih}</td>
                <td className={style.td}>{item.toplamIslemMiktari}</td>
                <td className={style.td}>{formatMoney(item.toplamIslemTutari)}</td>
                <td className={style.td}>{item.AgirlikOrtamaFiyat}</td>
              </tr>

            ))
          }
        </tbody>
      </table>
      <div className={style.h1}>
        <h1>Kerim Öztürk</h1>
      </div>
    </div>
  );
}

export default App;
