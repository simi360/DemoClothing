import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from 'react';
import { BUTTON_TYPE_CLASSES} from "../button/button.component";
import { useSelector } from "react-redux";
import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";


const PaymentForm = () => {
    const elements = useElements();
    const stripe = useStripe();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount*100})
        }).then(res=> res.json());

        const clientSecret = response.paymentIntent.clint_secret;
        // console.log("Debugging log ~ file: payment-form.component.jsx ~ line 32 ~ paymentHandler ~ clientSecret", clientSecret);
        //OR can also do like this -> const {paymentIntent: {client_secret}} = response;

        

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        })

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment successful')
            }
        }
    }

    // const payment2Handler = () => {
    //     console.log("Debugging log ~ file: payment-form.component.jsx ~ line 58 ~ payment2Handler ~ payment2Handler", payment2Handler);
    // }
    
    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler} >
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton 
                isLoading={isProcessingPayment}
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                >Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm;