/**
 * The function calculates the distance between two points on Earth given their latitude and longitude
 * coordinates.
 * @param lat1 - The latitude of the first point in degrees.
 * @param lon1 - The parameter `lon1` represents the longitude of the first location.
 * @param lat2 - The latitude of the second point.
 * @param lon2 - The parameter `lon2` represents the longitude of the second location.
 * @returns The function `calculateDistance` returns the distance between two points in meters.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c * 1000; // Distance in meters
};

/**
 * The function calculates the new latitude and longitude coordinates based on the given starting
 * coordinates, distance, and bearing.
 * @param lat - The latitude of the current location in degrees.
 * @param lon - The `lon` parameter represents the longitude of the current location.
 * @param distance - The distance parameter represents the distance in meters that you want to move
 * from the current location.
 * @param bearing - The bearing parameter represents the direction or angle in which the new location
 * should be calculated. It is measured in radians and represents the angle clockwise from true north.
 * @returns The function `calculateNewLocation` returns an object with the properties `latitude` and
 * `longitude`.
 */
export const calculateNewLocation = (lat, lon, distance, bearing) => {
  const EarthRadius = 6371; // Earth's radius in kilometers
  const dR = distance / 1000 / EarthRadius; // Convert distance to radians
  const latitude1 = (lat * Math.PI) / 180; // Convert latitude to radians
  const longitude1 = (lon * Math.PI) / 180; // Convert longitude to radians

  const newLatitude = Math.asin(
    Math.sin(latitude1) * Math.cos(dR) +
      Math.cos(latitude1) * Math.sin(dR) * Math.cos(bearing)
  );
  const newLongitude =
    longitude1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(dR) * Math.cos(latitude1),
      Math.cos(dR) - Math.sin(latitude1) * Math.sin(newLatitude)
    );

  return {
    latitude: (newLatitude * 180) / Math.PI,
    longitude: (newLongitude * 180) / Math.PI,
  };
};
