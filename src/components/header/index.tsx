import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiUser, FiLogIn } from 'react-icons/fi';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';


export function Header() {

  const { signed, loadingAuth, user } = useContext(AuthContext);


  return (
    <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4'>
      <header className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto'>

        <Link to='/'>
          <img
            src={logoImg}
            alt='Logo WebCarros'
          />
        </Link>

        {!loadingAuth && signed && (
          <div className='flex flex-row justify-center items-center gap-3'>
            <div>
              <h1 className='text-center'>Seja bem vindo <strong>{user?.name}</strong></h1>
            </div>
            <Link to='/dashboard'>
              <div className='border-2 rounded-full p-1 border-gray-900'>
                <FiUser size={24} color='#000' />
              </div>

            </Link>
          </div>
        )}

        {!loadingAuth && !signed && (
          <Link to='/login'>
            <FiLogIn size={24} color='#000' />
          </Link>
        )}

      </header>
    </div>
  )
}