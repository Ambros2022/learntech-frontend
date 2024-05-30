// components/GoogleMap.js
const GoogleMap = ({ latitude, longitude }) => (
  <iframe
    width="100%"
    height="300px"
    loading="lazy"
    allowFullScreen
    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387744.9000837001!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${longitude}!3z${latitude}!2m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d${latitude}!4d${longitude}`}
  ></iframe>
);

export default GoogleMap;
