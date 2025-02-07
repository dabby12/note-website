import React from 'react';

const Conditions = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
            <p className="mb-4">
                Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern [Your Company Name]'s relationship with you in relation to this website.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Use of the Website</h2>
            <p className="mb-4">
                The content of the pages of this website is for your general information and use only. It is subject to change without notice.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Privacy</h2>
            <p className="mb-4">
                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
            <p className="mb-4">
                Your use of this website and any dispute arising out of such use of the website is subject to the laws of [Your Country/State].
            </p>
            <h2 className="text-2xl font-semibold mb-2">Changes to Terms</h2>
            <p className="mb-4">
                We may update our Terms and Conditions from time to time. We will notify you of any changes by posting the new Terms and Conditions on this page.
            </p>
            <p className="mb-4">
                These terms and conditions are effective as of <span className='text-blue-500'>31.1.2025</span>.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                <a href='/'>   
            Accept
                </a>
            </button>
            <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 m-4'>
            <a href='/'>
            Back
            </a>
            </button>
        </div>
    );
};

export default Conditions;