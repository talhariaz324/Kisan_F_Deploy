

import { useEffect, useState } from 'react';
  
const LocationG = () => {
  const [locationState, setLocationState] = useState('');
  const Punjab = ["Wheat  --Harvest: 4 Months", "Rice  --Harvest: 4 Months", "Cotton  --Harvest: 160 Days", "Sugarcane  --Harvest: 12 Months"]
  const KPK = ["Pulses  --Harvest: 80 Days", "Tabbaco  --Harvest: 90 to 120 Days", "Maize  --Harvest: 60 to 100 Days"]
  const Sindh = ["Tomato  --Harvest: 60-100 days", "Chillies  --Harvest: 60-70 days", "Dates  --Harvest:  4-8 years", "Banana  --Harvest: 9-12 months", "Cotton  --Harvest: 160 days ",  "Wheat  --Harvest: 120 days",]
  const Balochistan = ["Grapes  --Harvest: 1-3 years", "Peaches  --Harvest: 3-4 years", "Almonds  --Harvest:  7-8 months", "Apricots  --Harvest:  3-4 years", "Cherries  --Harvest: 3 years"]
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'bdc_f46bdfecf83c405eb9d1462a78e7f65d';
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${apiKey}`)
          .then((response) => response.json())
          .then((data) => setLocationState(data.principalSubdivision))
          .catch((error) => console.error(error));
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div>
    <h3 className='text-center text-dark mt-2'>Your Location is: {locationState}</h3>
    
    <h4 className='ms-5 text-dark mt-2'>You can grow these and can harvest details are below:</h4>
     {locationState === 'Punjab' ? Punjab.map((item, index) => <h5 className='text-success ms-5 mt-4 ' key={index}>{`${index +1}: `} {item}</h5>) : 
     locationState === 'KPK' ? KPK.map((item, index) => <h5 className='text-success ms-5 mt-4 ' key={index}>{`${index +1}: `} {item}</h5>) :
      locationState === 'Sindh' ? Sindh.map((item, index) => <h5 className='text-success ms-5 mt-4 ' key={index}>{`${index +1}: `} {item}</h5>) :
      locationState === 'Balochistan' ? Balochistan.map((item, index) => <h5 className='text-success ms-5 mt-4 ' key={index}>{`${index +1}: `} {item}</h5>) : null
       }
    </div>
  );
}

 export default LocationG;
