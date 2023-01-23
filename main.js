let mapOptions = {
  center: [39.2851, -76.60823],
  zoom: 15,
};

let map = new L.map("map", mapOptions);

let layer = new L.TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
map.addLayer(layer);

/*
let locations = [
    {
        "lat":39.2859,
        "long":-76.6059,
    },
    {
        "lat":39.284,
        "long":-76.6225,
    }
]

locations.forEach(element => {
    new L.Marker([element.lat,element.long]).addTo(map);
});
*/
const APP_TOKEN = "eh5vkMjnyblYVRaxUrtyf6ZDP";

$.ajax({
  url: "https://opendata.maryland.gov/resource/65du-s3qu.json?county_desc=Baltimore",
  type: "GET",
  data: {
    $limit: 10,
    $$app_token: "eh5vkMjnyblYVRaxUrtyf6ZDP",
  },
}).done(function (data) {
  data.forEach(function (item) {
    console.log(item.geocoded_column);
  });
});

async function getData() {
  const url =
    "https://opendata.maryland.gov/resource/65du-s3qu.json?$where=year > 2020&county_desc=Baltimore";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-App-Token": "eh5vkMjnyblYVRaxUrtyf6ZDP",
    }
  });
  const data = await response.json();

  for (item of data) {
    const marker = L.marker([item.latitude, item.longitude]).addTo(map);
    const txt = `${item.report_type}' type of accident occurred by ${item.harm_event_desc1} on '+item.acc_date+' at '+item.acc_time`;
    marker.bindPopup(txt);
  }
  console.log(data);
}

getData();

// let marker = new L.Marker([39.2851, -76.60823]);
// marker.addTo(map);
