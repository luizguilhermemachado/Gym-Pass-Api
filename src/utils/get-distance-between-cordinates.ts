export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCordinates(
  from: Coordinate,
  to: Coordinate,
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const radLat1 = (Math.PI * from.latitude) / 180
  const radLat2 = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}
