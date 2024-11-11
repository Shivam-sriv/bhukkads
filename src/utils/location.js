import axios from "axios";

export function handleLocationClick(nearRestaurant,bestRetaurantSection=null) {
    if (navigator?.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            nearRestaurant(position.coords.latitude, position.coords.longitude);
            bestRetaurantSection!==null&&  bestRetaurantSection(position.coords.latitude, position.coords.longitude);
                
        }, (error) => {
            console.log("error");
        });
    } else {
        console.log("Geolocation not supported");
    }
}


export const getLangLat = (setLatLong) => {
  return new Promise((resolve, reject) => {
    if (navigator?.geolocation) {
      console.log("raa",navigator.geolocation);
      
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          setLatLong({latitude:position.coords.latitude,longitude:position.coords.longitude})
          const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          resolve(res.data.address);
        } catch (error) {
          console.error("Error fetching address:", error);
          reject(error);
        }
      }, (error) => {
        console.error("Geolocation error:", error);
        reject(error);
      });
    } else {
      console.log("Geolocation not supported");
      reject(new Error("Geolocation not supported"));
    }
  });
};


