import React, {useEffect, useState, useContext} from 'react';
import {AuthContext} from '../Authentication';
import Map from './Map/Map';
import Loading from './Loading';
const postcodes = require("node-postcodes.io");

const ProfileMap = () => {
    const { currentUser } = useContext(AuthContext);
    const profile = currentUser;
    const [loading, setLoading] = useState(true);
    const [center, setCenter] = useState({latitude:0, longitude:0});


    useEffect(() => {
        async function fetchData(){
            await getGeolocation(profile.postcode).then((res) => {
                setCenter({latitude: res.latitude, longitude:res.longitude});
            })
            setLoading(false);
        }
        fetchData()
    }, [])


    async function getGeolocation(postcode) {
        const result = await postcodes.lookup(postcode).then((res) => {
          return res.result;
        });
        return result;
      }

      if (loading && center !== {latitude: 0, longitude: 0}) {
        return <Loading />;
      }
    return (
        <div>
            <h1>Parks Near You</h1>
            <Map centerLatitude={center.latitude} centerLongitude={center.longitude}/>
        </div>
    );
};

export default ProfileMap;