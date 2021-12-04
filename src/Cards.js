import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out these articles!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='./img-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='Technology'
              path='/services'
            />
            <CardItem
              src='./img-2.jpg'
              text='India registers 29,500 drones as Govt sets up database'
              label='Drones'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='./img-1.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Technology'
              path='/services'
            />
            <CardItem
              src='./img-9.jpg'
              text='Experience Football on Top of the Himilayan Mountains'
              label='Finance'
              path='/products'
            />
            <CardItem
              src='./img-2.jpg'
              text='Jetpacks, flying cars and taxi drones: transport future is in the skies '
              label='Drones'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;