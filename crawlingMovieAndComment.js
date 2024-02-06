import axios from 'axios';
import * as cheerio from 'cheerio'

async function crawlingWatchapedia() {
    const movieUrl = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=%EB%B0%95%EC%8A%A4%EC%98%A4%ED%94%BC%EC%8A%A4';
    const movieResp = await axios.get(movieUrl);
    const $movie = cheerio.load(movieResp.data);

    const result = await $movie('div.cm_content_wrap li')
        .map((idx, ele) => {
            const title = $movie(ele).find('strong.name').text();
            const href = $movie(ele).find('a').prop('href');

            return ({
                title: title,
                href: href
            })
        }).get();

    console.log(result);





    console.log(result);

}


crawlingWatchapedia();

