import React, { useEffect, useState } from 'react';
import Repository from '../repository/repository';
import 'bootstrap/dist/css/bootstrap.min.css';


const ThankYouPage = () => {
    let [finished, setFinished] = useState(false);
    const finishOrder = async () => {
        try {
            Repository.finishOrder().then((result) => {
                if (result?.status !== 200) {
                    console.error("Error while finishing order");
                    return;
                }
            }
            );
        } catch (error) {
            console.error('Error fetching order status:', error);
        }
    };

    useEffect(() => {
        if (finished) return;
        finishOrder();
        setFinished(true);
    }, []);

   

    return (
        <div>
            <h1 className='mx-5 h1'>Thank You for Your Order!</h1>
        </div>
    );
};

export default ThankYouPage;