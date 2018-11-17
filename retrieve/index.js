const rp = require('request-promise-native');

// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/0' --compressed -H 'Cache-Control: max-age=0' > tmp
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/51' --compressed -H 'Cache-Control: max-age=0' >> tmp
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/102' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/153' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/204' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/255' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/306' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/357' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/408' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/459' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/510' --compressed -H 'Cache-Control: max-age=0'
// curl 'https://www.biocoop.fr/stores/list/json/83/0/0/0/51/561' --compressed -H 'Cache-Control: max-age=0'

function get(url) {
  return rp({
    url: url,
    json: true,
    gzip: true,
  });
}

function biocoop(acc, page) {
  if(!page) {
    page = 0;
  }
  if(!acc) {
    acc = [];
  }
  return get(`https://www.biocoop.fr/stores/list/json/83/0/0/0/51/${page*51}`)
  .then((res) => {
    if(!res.stores || res.stores.length == 0) {
      return acc;
    }
    acc = acc.concat(res.stores);
    return biocoop(acc, page+1);
  })

}

function getAllBiocoop() {
  biocoop()
  .then(res => {
    res.forEach((shop) => {
      console.log([
        'Biocoop',
        shop.title,
        'https://www.biocoop.fr' + shop.infos.url,
        shop.infos.address_1
          + (shop.infos.address_2 ? ', ' + shop.infos.address_2 : '')
          + (shop.infos.address_3 ? ', ' + shop.infos.address_3 : ''),
        shop.infos.city,
        shop.infos.postal_code,
        shop.lat,
        shop.lng,
        shop.days[0].hours,
        shop.days[1].hours,
        shop.days[2].hours,
        shop.days[3].hours,
        shop.days[4].hours,
        shop.days[5].hours,
        shop.days[6].hours,
      ].join('\t'))
    })
  })
}

getAllBiocoop();