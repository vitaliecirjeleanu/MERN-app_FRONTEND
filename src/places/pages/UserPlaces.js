import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [places, setPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaces(data.places);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [sendRequest, userId]);

  const placeDeleteHandler = deletedPlaceId => {
    setPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlaceList items={places} onDelete={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
