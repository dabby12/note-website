import React from "react";

function Terms() {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Terms</h1>
      <p className="mb-4">This is the terms and conditions page.</p>
      <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using this website, you accept and agree to be bound by
        the terms and provision of this agreement.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Modification of Terms</h2>
      <p className="mb-4">
        We reserve the right to change the terms and conditions at any time. It
        is your responsibility to review these terms periodically.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
      <p className="mb-4">
        Your privacy is important to us. Please review our Privacy Policy to
        understand our practices.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Governing Law</h2>
      <p className="mb-4">
        These terms and conditions are governed by and construed in accordance
        with the laws of the jurisdiction in which our company is based.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        <a href="/">Accept</a>
      </button>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 m-4">
        <a href="/">Back</a>
      </button>
    </div>
  );
}
export default Terms;
