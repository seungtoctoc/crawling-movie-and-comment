import axios from 'axios';
import * as cheerio from 'cheerio'

async function crawlingWatchapedia() {
    const watchaUrl = 'https://pedia.watcha.com/ko-KR/';
    const resp = await axios.get(watchaUrl);
    const $watcha = cheerio





}


crawlingWatchapedia();

