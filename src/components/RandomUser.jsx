import React, { useEffect, useState } from 'react';
import '../App.css';

export const RandomUser = () => {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    fetch("https://api.randomuser.me/")
      .then((res) => res.json())
      .then((data) => {
        const userData = {
          name: data.results[0].name.first,
          email: data.results[0].email,
          picture: data.results[0].picture.large,
          phone: data.results[0].phone,
          city: data.results[0].location.city,
          country: data.results[0].location.country,
          age: data.results[0].dob.age,
        };
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error fetching the user:", error);
      });
  };

  useEffect(() => {
    fetchUser();
    const intervalId = setInterval(fetchUser, 5000);

    return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonte
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-dark'>
      {user ? (
        <div className='col-lg-4'>
          <div className='card text-center bg-white'>
            <div className='card-header pt-2 pb-2'>
              <img src={user.picture} className='img-fluid rounded-circle' alt="profile" />
            </div>
            <div className='card-body'>
              <h4 className='card-title'>{user.name}</h4>
              <p className='card-text'>{user.email}</p>
              <p className='card-text'>Phone: {user.phone}</p>
              <p className='card-text'>
                {user.city}, {user.country}
              </p>
              <p className='card-text'>Age: {user.age}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-white'>Loading...</p>
      )}
    </div>
  );
};
