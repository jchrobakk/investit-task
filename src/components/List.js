import React, { useEffect, useState } from 'react';
import { fetchPhotos } from '../api';
import { useSelector, useDispatch } from 'react-redux';
import { addToList } from '../reducers/app';
const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const imagesList = useSelector((state) => state.app.list);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { images, total } = await fetchPhotos({ perPage: 30, page });
      if (imagesList.length === total) {
        return;
      }
      setTotal(total);
      dispatch(addToList(images));
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <div style={{ minHeight: '90vh', width: '100%' }}>
      <ul className="grid grid-cols-3 justify-items-center">
        {imagesList.map((image) => (
          <li
            className="flex flex-col items-center"
            key={image.id}
          >
            <img
              className="h-60"
              src={image.urls.regular}
              alt={image.alt_description}
            />
            <figcaption>{image.user.username}</figcaption>
          </li>
        ))}
      </ul>
      {isLoading && (
        <p className="text-4xl text-bold text-center">Loading...</p>
      )}
      {!isLoading && imagesList.length === total && (
        <p className="text-4xl text-bold text-center">No more photos</p>
      )}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default List;
