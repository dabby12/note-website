import React from 'react'

function NotDone() {
  return (
    <div className="text-center text-lg text-dark-900 dark:text-neutral-100">
      <h1 className="mb-4">This feature is not done yet!</h1>
      <p>We're working hard to bring it to you soon.</p>
      <button className="mt-4 bg-light-amber-500 text-white py-2 px-4 rounded-full hover:bg-light-amber-600 transition-colors">
        Notify Me
      </button>
      <div className="mt-8 text-sm text-gray-500">You can check our roadmap for updates.</div>
      <button className="mt-4 bg-light-blue-500 text-white py-2 px-4 rounded-full hover:bg-light-blue-600 transition-colors">
        Go Back to Homepage
      </button>
    </div>
  )
}

export default NotDone