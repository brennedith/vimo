// https://stackoverflow.com/a/24680708
// Pythagoran theorem
const distanceBetweenPoints = (userLocation, postLocation) => {
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * postLocation.latitude) / 180.0) * ky;
  const dx = Math.abs(postLocation.longitude - userLocation.longitude) * kx;
  const dy = Math.abs(postLocation.latitude - userLocation.latitude) * ky;
  return Math.sqrt(dx * dx + dy * dy);
};

export default distanceBetweenPoints;
