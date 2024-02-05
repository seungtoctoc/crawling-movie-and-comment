import axios from 'axios';
import * as cheerio from 'cheerio'

async function crawlingWatchapedia() {
    const movieSearchUrl = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&qvt=0&query=%EB%B0%95%EC%8A%A4%EC%98%A4%ED%94%BC%EC%8A%A4';
    const watchaResp = await axios.get(watchaUrl);
    const $watcha = cheerio.load(watchaResp.data);

    const $movies = $watcha('li > a');

    const result = await Promise.all($movies
        .map(async (idx, ele) => {
            const title = $watcha(ele).prop('title');
            
            if (title) {
                const link = $watcha(ele).prop('href');
                const detailUrl = 'https://pedia.watcha.com/' + link;
                
                const detailResp = await axios.get(detailUrl);
                const $detail = cheerio.load(detailResp.data);
                const score = $detail('div.css-1rqwswy.e15eo6m110').text().substring(0, 10);



                return ({
                    title: title,
                    link: link,
                    detailUrl: detailUrl,
                    score: score
                })
            }

            return null;
        }).get()
    );


    console.log(result);

}


crawlingWatchapedia();

