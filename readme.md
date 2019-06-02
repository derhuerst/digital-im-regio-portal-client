# digital-im-regio-portal-client

**Query information from the [*Digital im Regio* portal in German Regio trains](https://www.zugreiseblog.de/digital-im-regio-app-colibri-auslastung/).**

[![npm version](https://img.shields.io/npm/v/digital-im-regio-portal-client.svg)](https://www.npmjs.com/package/digital-im-regio-portal-client)
[![build status](https://api.travis-ci.org/derhuerst/digital-im-regio-portal-client.svg?branch=master)](https://travis-ci.org/derhuerst/digital-im-regio-portal-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/digital-im-regio-portal-client.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installation

```shell
npm install digital-im-regio-portal-client
```


## Usage

```js
const fetchStatus = require('digital-im-regio-portal-client')

fetchStatus()
.then(console.log)
.catch((err) => {
	console.error(err)
	process.exit(1)
})
```

```js
{
  type: 'RE',
  number: '93109',
  name: 'RE 3',
  tickermessage: null,
  speed: 32.461,
  nextStopovers: [ {
    stop: {
      type: 'stop',
      id: '8010338',
      name: 'Stralsund Hbf',
      ds100: 'WSR',
      location: { latitude: 54.308626, longitude: 13.077321 }
    },
    arrival: null,
    arrivalPlatform: 2,
    departure: null,
    departurePlatform: 2,
    status: '',
    message: '',
    distanceToNext: 14.58,
    arrivalDelay: 0,
    departureDelay: 0
  },
  // …
  {
    stop: {
      type: 'stop',
      id: '8013470',
      name: 'Bernau(b Berlin)',
      ds100: 'BBRN',
      location: { latitude: 52.675569, longitude: 13.592641 }
    },
    arrival: null,
    arrivalPlatform: 5,
    departure: null,
    departurePlatform: 5,
    status: '',
    message: '',
    distanceToNext: null,
    arrivalDelay: 180,
    departureDelay: 180
  } ],
  position: { latitude: 52.80088, longitude: 13.736525 },
  carriageUtilization: { bikes: 0, passengers: 0 },
  carriageCapacity: { passengers: 93, bikes: 12 },
  simCards: [ {
    sim: '89492018167014765317',
    type: 'lte',
    signal: -111,
    provider: 'Vodafone D2'
  } ]
}
```


## Contributing

If you have a question or need support using `digital-im-regio-portal-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/digital-im-regio-portal-client/issues).
