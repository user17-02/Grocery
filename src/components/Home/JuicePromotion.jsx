import React from 'react';
import './JuicePromotion.css';
const juiceBottle = 'https://images.unsplash.com/photo-1622483767028-1c4b7b250550?q=80&w=600&auto=format&fit=crop';

const JuicePromotion = () => {
    return (
        <section className="juice-promotion section-padding">
            <div className="container">
                <div className="juice-promo-content">
                    <div className="juice-promo-image">
                        <img src={juiceBottle} alt="Fresh Juice and Fruits" />
                    </div>
                    <div className="juice-promo-text">
                        <p>We are Online Market of fresh fruits & vegetables.</p>
                        <p>You can also find organic & healthy juice, processed food as well as gentle skin care at our store.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JuicePromotion;
