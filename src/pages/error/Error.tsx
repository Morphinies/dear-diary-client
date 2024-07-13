import s from './Error.module.scss';
import { useNavigate } from 'react-router-dom';
import smileSad from '../../assets/smiles/sad';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={s.error}>
      {smileSad}
      <p className={s.errorMes}>Oh no... Error</p>
      <button onClick={() => navigate('/')} className={'btn ' + s.btn}>
        Main
      </button>
    </div>
  );
};

export default Error;
