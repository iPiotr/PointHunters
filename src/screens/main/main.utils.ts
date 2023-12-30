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
