import axios from 'axios';
import * as cheerio from 'cheerio'

async function crawlingWatchapedia() {
    const watchaUrl = 'https://pedia.watcha.com/ko-KR/?domain=movie';
    const watchaResp = await axios.get(watchaUrl);
    const $watcha = cheerio.load(watchaResp.data);

    const $movies = $watcha('li > a');

    const result = [];

    $movies
        .map(async (idx, ele) => {
            const title = $watcha(ele).prop('title');
            
            if (title) {
                const link = $watcha(ele).prop('href');
                const detailUrl = 'https://pedia.watcha.com/' + link;

                

                result.push({
                    title: title,
                    link: link,
                    detailUrl: detailUrl
                })
            }

            return null;
        });


    console.log(result);

}


crawlingWatchapedia();

