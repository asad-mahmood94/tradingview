import { useState } from 'react'


function PlayMovie() {
  
  return (
    <>
      <PlayButton movieName="Vicky Donor 078786" />

    </>
  );
}

export default PlayMovie

function PlayButton({ movieName }) {
  function PlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <button onClick={PlayClick}>
      Show
    </button>
  );
}




