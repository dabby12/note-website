import React, { useState } from 'react';

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetails, setCardDetails] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });
    const [billingDetails, setBillingDetails] = useState({
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
    });
    const [loading, setLoading] = useState(false);

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            console.log('Payment submitted', { paymentMethod, cardDetails, billingDetails });
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-blue-600 py-4 px-6">
                        <h1 className="text-2xl font-bold text-white">Make a Payment</h1>
                    </div>

                    <div className="p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Payment Method Selection */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                                <div className="flex space-x-4">
                                    <div
                                        className={`flex items-center border rounded-lg p-4 cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <div className="mr-3">
                                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium">Credit Card</p>
                                            <p className="text-sm text-gray-500">Pay with Visa, Mastercard</p>
                                        </div>
                                    </div>

                                    <div
                                        className={`flex items-center border rounded-lg p-4 cursor-pointer ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                        onClick={() => setPaymentMethod('paypal')}
                                    >
                                        <div className="mr-3">
                                            <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.64.64 0 0 1 .632-.537h6.699c2.694 0 4.638.636 5.48 1.893.766 1.14.983 2.527.647 4.141l-.1.044c-.74 3.479-3.584 5.134-7.66 5.134h-2.369c-.367 0-.678.264-.737.625l-.946 5.946a.64.64 0 0 1-.633.537h-1.32l.069-.83z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-medium">PayPal</p>
                                            <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Card Details */}
                            {paymentMethod === 'card' && (
                                <div className="mb-8">
                                    <h2 className="text-lg font-semibold mb-4">Card Details</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                            <input
                                                type="text"
                                                name="number"
                                                value={cardDetails.number}
                                                onChange={handleCardChange}
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={cardDetails.name}
                                                onChange={handleCardChange}
                                                placeholder="John Doe"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    name="expiry"
                                                    value={cardDetails.expiry}
                                                    onChange={handleCardChange}
                                                    placeholder="MM/YY"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                                <input
                                                    type="text"
                                                    name="cvc"
                                                    value={cardDetails.cvc}
                                                    onChange={handleCardChange}
                                                    placeholder="123"
                                                    maxLength="3"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Billing Information */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={billingDetails.address}
                                            onChange={handleBillingChange}
                                            placeholder="123 Main St"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={billingDetails.city}
                                            onChange={handleBillingChange}
                                            placeholder="New York"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={billingDetails.state}
                                            onChange={handleBillingChange}
                                            placeholder="NY"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zip"
                                            value={billingDetails.zip}
                                            onChange={handleBillingChange}
                                            placeholder="10001"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                        <select
                                            name="country"
                                            value={billingDetails.country}
                                            onChange={handleBillingChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className={`bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Submit Payment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
