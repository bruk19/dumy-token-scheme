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
          {isYourDeposite ? (
            // Render content for isYourDeposite
            <tr>
              <td>Your Deposit Content</td>
            </tr>
          ) : isWallet ? (
            // Render content for isWallet
            <tr>
              <td>
                <div>
                  <p>dd</p>
                  <p>ddf</p>
                </div>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  );
}

export default Deposit;
