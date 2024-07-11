import './Details.scss';

export const Details = () => {
  return (
    <div className="details">
      <img
        className="details__img"
        src="https://rickandmortyapi.com/api/character/avatar/31.jpeg"
        alt="img"
      />
      <h2 className="h2-details">Baby Wizard</h2>
      <h4 className="h4-details">Status: Alive</h4>
      <h4 className="h4-details">Species: Alien</h4>
      <h4 className="h4-details">
        Last known location: Earth (Replacement Dimension)
      </h4>
    </div>
  );
};
