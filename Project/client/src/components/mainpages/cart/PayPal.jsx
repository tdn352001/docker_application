import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'


const PaypalButton = ({ total, tranSuccess }) => {
    const onSuccess = (payment) => {
        console.log('The payment was succeeded!', payment)
        tranSuccess(payment)
    }
    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
        console.log('Error!', err);
    }


    let env = 'sandbox';
    let currency = 'USD';

    const client = {
        sandbox: 'AeRAKNwRMd1VrE9OCKfwmvdvPy-tL1e0TO7NDYXG_L7O-h2amhyLx0G9FDpG7Nrq1KrIbLR3LqRtX1PU',
        production: 'YOUR-PRODUCTION-APP-ID',
    }

    let style = {
        size: 'small',
        color: 'blue',
        shape: 'rect',
        label: 'checkout',
        tagline: false,
    }


    return (
        <PaypalExpressBtn
            style={style}
            env={env}
            client={client}
            currency={currency}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            total={total} />

    );
}

export default PaypalButton
