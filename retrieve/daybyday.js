const rp = require('request-promise-native');

function get() {
  return rp({
    url: 'http://daybyday-shop.com/wordpress/wp-admin/admin-ajax.php?action=store_search&lat=46.227638&lng=2.213749000000007&max_results=25&radius=100&autoload=1',
    json: true,
    gzip: true,
  });
}

function getAllDayByDay() {
  get()
  .then(res => {
    res.forEach(shop => {
      const hours = shop.hours
        .split(/<tr>/g)
        .map(day => day.split('</td><td>')[1])
        .filter(day => day)
        .map(day => day.replace("</time><time>", " / ").replace(/<[^>]+>/g, ''))
      console.log([
        'Day by day',
        shop.store,
        shop.permalink,
        shop.address + (shop.address2 ? ' ' + shop.address2 : ''),
        shop.city,
        shop.zip,
        shop.country,
        shop.lat,
        shop.lng,
      ].concat(hours).join('\t'));
    })
  })
}

getAllDayByDay();