'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProviders, signIn, useSession } from 'next-auth/react';
import Meta from '@/components/Meta/index';
import { AuthLayout } from '@/layouts/index';
import { useTranslation } from "react-i18next";

const Login = () => {

  const { status } = useSession();
  const { t } = useTranslation();

  const [socialProviders, setSocialProviders] = useState([]);
  
  const signInWithCognito = () => {
    localStorage.provider = 'cognito';
    signIn('cognito');
  };

  const signInWithSocial = (socialId) => {
    localStorage.provider = socialId;
    signIn(socialId);
  };

  useEffect(() => {
    (async () => {
      const { cognito, ...providers } = await getProviders();

      const socialProviders = [];
      for (const provider in providers) {
        socialProviders.push(providers[provider]);
      }
      setSocialProviders([...socialProviders]);
    })();
  }, []);

  return (
    <AuthLayout>
      <Meta
        title="Suncor Demo | Login"
        description="NextJS app"
      />
      <div className="flex flex-col items-center justify-center p-5 m-auto space-y-5 rounded shadow-lg md:p-10 md:w-1/3">
        <div>
          <Link href="/" className="text-4xl font-bold">
            Suncor Demo
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{t('login.label')}</h1>
        </div>
        
        <div className="flex flex-col w-full space-y-3">
            <button
              className="py-2 text-white bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-75"
              disabled={status === 'loading'}
              onClick={() => signInWithCognito()}
            >
              Continue
            </button>
        </div>

       {socialProviders.length > 0 && (
          <>
            <span className="text text-black-400">or sign in with</span>
            <div className="flex flex-col w-full space-y-3">
              {socialProviders.map((provider, index) => (
                <button
                  key={index}
                  className="py-2 text-white bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-75"
                  disabled={status === 'loading'}
                  onClick={() => signInWithSocial(provider.id)}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;
