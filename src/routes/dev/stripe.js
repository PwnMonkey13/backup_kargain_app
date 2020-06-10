import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../../components/Stripe/CheckoutForm';

const stripeToken = "pk_test_51GqJrJEItcAGSRw8the6YZdACyYMrHOZsCRKSfNr6tJRlN4L3MpXpUjo7MOpAPvPcpY5WvIxDSwsZRH5JTKU5q9a00dDJhABpd";

const stripePromise = loadStripe(stripeToken);

export default () => {
    return(
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}
