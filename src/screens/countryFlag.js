import React from 'react';
import CountryFlags from 'react-country-flags';

function CountryFlag({ countryCode }) {
  return (
    <div>
      <CountryFlags
        countryCode={countryCode}
        svg
        style={{
          width: '20px', //  Adjust the width and height as needed
          height: '17px',
        }}
      />
    </div>
  );
}

export default CountryFlag;
