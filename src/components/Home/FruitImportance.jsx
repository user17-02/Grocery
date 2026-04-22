import React from 'react';
import './FruitImportance.css';
import fruitBasket from '../../assets/feature-1.webp';

const FruitImportance = () => {
    return (
        <section className="fruit-importance section-padding">
            <div className="container fruit-importance-wrapper">
                <div className="fruit-importance-content">
                    <h2 className="section-title">Important to eat fruit</h2>
                    <p>
                        Eating fruit provides health benefits — people who eat more fruits and
                        vegetables as part of an overall healthy diet are likely to have a reduced
                        risk of some chronic diseases. Fruits provide nutrients vital for health and
                        maintenance of your body.
                    </p>
                    <p>
                        Fruits are sources of many essential nutrients that are underconsumed,
                        including potassium, dietary fiber, vitamin C, and folate (folic acid).
                    </p>
                    <p>
                        Most fruits are naturally low in fat, sodium, and calories. None have
                        cholesterol.
                    </p>
                </div>
                <div className="fruit-importance-image">
                    <img src={fruitBasket} alt="Importance of eating fruit" />
                </div>
            </div>
        </section>
    );
};

export default FruitImportance;
