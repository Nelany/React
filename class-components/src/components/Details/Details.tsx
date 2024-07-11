import { useNavigate } from 'react-router-dom';
import './Details.scss';

export const Details = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="details">
      <button className="details__close-button" onClick={handleClose}>
        X
      </button>
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
