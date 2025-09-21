import React, { useEffect, useState } from 'react';
import { CarAnalyzer } from './carAnaliz';
import Userfront from '@userfront/toolkit';
import Bars from '../ui/bars';

export default function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!Userfront.user.userId);
    };
    checkLogin();
    window.addEventListener('focus', checkLogin);

    return () => {
      window.removeEventListener('focus', checkLogin);
    };
  }, []);
  return (
    <div>
      {isLoggedIn ? (
        <div className="flex">
          <div className="min-h-screen flex flex-col  p-10">
            <div className=" ml-30 mb-5">
              <h1 className="text-4xl font-bold text-gray-900">inDrive</h1>
              <p className="text-gray-600">Car Safety Analysis</p>
            </div>
            <CarAnalyzer />
            <div className=" ml-15 mt-7">
              <p className="text-sm text-gray-400">Прототип для демонстрации ML-модели</p>
            </div>
          </div>
          <div>
            <Bars />
          </div>
        </div>
      ) : (
        <div className="flex text-center justify-center pt-90 text-white h-screen bg-green-900 ">
          Похоже вы не вошли в аккаунт <br /> Зарегестрируйтесь или войдите в акканут чтобы
          использоать приложение
        </div>
      )}
    </div>
  );
}
