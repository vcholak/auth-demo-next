'use client'

import { Menu } from '@headlessui/react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useTranslation } from "react-i18next";

const Header = () => {

  const provider = localStorage.provider; 

  const { data } = useSession();
  
  const { t } = useTranslation();

  const getIdentityProviderBaseUrl = (identityProvider) => {
    let value;
    switch(identityProvider) {
      case 'cognito':
        value = process.env.NEXT_PUBLIC_COGNITO_BASE_URL;
        break;
      case 'google':
        value = process.env.NEXT_PUBLIC_GOOGLE_BASE_URL;
        break;
      default:
        throw new Error(`Unsupporter Identity Provider: ${identityProvider}`);
    }
    return value;
  }

  const getIdentityProviderClientId = (identityProvider) => {
    let value;
    switch(identityProvider) {
      case 'cognito':
        value = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;
        break;
      case 'google':
        value = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        break;
      default:
        throw new Error(`Unsupporter Identity Provider: ${identityProvider}`);
    }
    return value;
  }

  const logOut = (identityProvider) => {

    const baseUrl = getIdentityProviderBaseUrl(identityProvider);
    const clientId = getIdentityProviderClientId(identityProvider);
    const googleAppEngineUrl = process.env.NEXT_PUBLIC_GOOGLE_APPENGINE_URL;
    const appLogoutUri = process.env.NEXT_PUBLIC_APP_LOGOUT_URL;

    let logoutUrl;
    switch(identityProvider) {
      case 'cognito':
        logoutUrl = `${baseUrl}/logout?client_id=${clientId}&response_type=code&scope=email+openid+phone&logout_uri=${appLogoutUri}`;
        break;
      case 'google':
        logoutUrl = `${baseUrl}/Logout?continue=${googleAppEngineUrl}/_ah/logout?continue=${appLogoutUri}`;
        break;
      default:
        throw new Error(`Unsupporter Identity Provider: ${identityProvider}`);
    }
    
    // redirect to Identity Provider's logout endpoint
    window.location.assign(logoutUrl);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
        <h5 className="font-bold text-gray-800 dark:text-gray-200">
          {data && data.user && (
            <div>
              <p>Logged In as {data.user.email}</p>
              <p className='mt-4'>Identity Provider: {provider}</p>
            </div>
          )}
        </h5>
      </div>

      <Menu as="div" className="relative inline-block text-left">
        <div className="p-2">
            <Menu.Item>
              <button
                className="flex items-center w-full px-2 py-2 space-x-2 text-sm rounded bg-blue-600 text-white group"
                onClick={() => logOut(provider)}
              >
                <ArrowRightOnRectangleIcon
                  aria-hidden="true"
                  className="w-5 h-5"
                />
                <span>{t("common.label.logout")}</span>
              </button>
            </Menu.Item>
          </div>
      </Menu>
      
     </div>
  );
};

export default Header;
