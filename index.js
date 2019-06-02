'use strict'

const {fetch} = require('fetch-ponyfill')({
	Promise: require('pinkie-promise')
})
const omit = require('lodash/omit')
const pick = require('lodash/pick')
const {DateTime} = require('luxon')

const endpoint = 'https://wifi-bahn.de/'
const userAgent = 'https://github.com/derhuerst/digital-im-regio-portal-client'

const request = (route, opt = {}) => {
	if ('string' !== typeof route) throw new Error('route must be a string')

	return fetch(endpoint + route, {
		mode: 'cors',
		redirect: 'follow',
		headers: {
			'User-Agent': userAgent,
			...(opt.headers || {})
		},
		...opt
	})
	.then((res) => {
		if (!res.ok) {
			const err = new Error(res.statusText)
			err.statusCode = res.status
			throw err
		}
		return res.json()
	})
}

const formatDate = (unixTime) => {
	if ('number' !== typeof unixTime) return null
	return DateTime.fromMillis(unixTime * 1000).toISO({
		suppressMilliseconds: false
	})
}

const parseStopover = (_) => {
	const res = {
		stop: {
			type: 'stop',
			...pick(_, ['id', 'name']),
			ds100: _.shortTag, // todo: is it always the DS100 code?
			location: {
				latitude: _.lat,
				longitude: _.lng
			}
		},
		arrival: formatDate(_.approach),
		arrivalPlatform: _.track || null,
		departure: formatDate(_.departure),
		departurePlatform: _.track || null,
		...pick(_, ['status', 'message']), // todo: parse
		distanceToNext: _.distances.next || null
	}

	if ('number' === typeof _.delay) {
		if (res.arrival) {
			res.arrival = formatDate(res.arrival + _.delay * 1000)
			res.arrivalDelay = _.delay
		}
		if (res.departure) {
			res.departure = formatDate(res.departure + _.delay * 1000)
			res.departureDelay = _.delay
		}
	}

	return res
}

const fetchStatus = () => {
	return request('schedule.jason', {
		headers: {'Accept': 'application/json'}
	})
	.then((res) => { // todo
		return {
			...omit(res, [
				'jobs', 'timestamp', 'validUntil', // todo: what are these for?
				'lat', 'lng',
				'stations',
				'afz',
				'cards'
			]),
			nextStopovers: res.stations.map(parseStopover),
			position: {
				latitude: res.lat,
				longitude: res.lng
			},
			carriageUtilization: omit(res.afz, ['capacity']),
			carriageCapacity: res.afz && res.afz.capacity || null,
			simCards: res.cards
		}
	})
}

module.exports = fetchStatus
