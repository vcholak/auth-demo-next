import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Welcome = () => {

  const { t } = useTranslation();

  const { data, status } = useSession();
  
  const [rewards, setRewards] = useState(0);
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false)
  
  const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/rewards`;

  useEffect(() => {

    const email = data.user.email;
    setEmail(email);
    
    const getUrl = `${url}?email=${email}`;
    fetch(getUrl)
      .then((resp) => resp.json())
      .then((result) => {
        setRewards(result.rewards);
      })
      .catch((error) => {
        console.log(error)
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch rewards');
      })
  }, []);

  const increment = () => {
    const payload = {
      email: email,
      increase: 10
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log('result=', result)
        setRewards(result.rewards);
        setDisabled(true);
      })
      .catch((error) => {
        console.log(error)
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to update rewards');
      })
  }

  return (
    <AccountLayout>
      <Meta title="Suncor Demo - Dashboard" />
      <Content.Title
        title={t('workspace.dashboard.header.title')}
      />
      <Content.Divider />
      <Content.Container>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <p>You have {rewards} reward points</p>
          <button 
          className=" px-2 py-2 space-x-2 text-sm rounded bg-blue-600 text-white group"
          onClick={increment}
          disabled={disabled}
          >Claim 10 points</button>
        </div>
      </Content.Container>
    </AccountLayout>
  );
};

export default Welcome;
