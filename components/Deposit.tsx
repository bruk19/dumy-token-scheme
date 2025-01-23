import React, { useEffect, useState } from 'react';

function Deposit() {
  const [isDeposite, setIsDeposite] = useState(false);
  const isYourDeposite = false;
  const isWallet = true;

  useEffect(() => {
    // Simulate fetching the isDeposite data
    setTimeout(() => {
      setIsDeposite(isYourDeposite);
    }, 1000);
  }, []);

  return (
    <>
      <table className="text-white">
        <tbody>
         <tr>
            
         </tr>
        </tbody>
      </table>
    </>
  );
}

export default Deposit;
