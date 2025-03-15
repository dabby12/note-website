import { CheckCircle, Pencil, Cloud, Lock, Layers } from "lucide-react";
import { DiOpensource } from "react-icons/di";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
const features = [
  {
    icon: <Pencil size={40} className="text-light-purple-500" />, 
    title: "Easy Note-Taking",
    description: "Create, edit, and format notes effortlessly with our intuitive editor.",
  },
  {
    icon: <Cloud size={40} className="text-light-blue-500" />, 
    title: "Cloud Sync",
    description: "Access your notes from anywhere with real-time cloud synchronization.",
  },
  {
    icon: <Lock size={40} className="text-light-coral-500" />, 
    title: "Secure & Private",
    description: "Your notes are encrypted and protected to ensure your privacy.",
  },
  {
    icon: <Layers size={40} className="text-light-green-500" />, 
    title: "Organized Structure",
    description: "Keep your notes neatly structured with folders and tags.",
  },
  {
    icon: <CheckCircle size={40} className="text-light-amber-500" />, 
    title: "Task Integration",
    description: "Manage to-dos and set reminders within your notes.",
  },
  {
    icon: <DiOpensource size={40} className="text-light-purple-500" />, 
    title: "Open Source",
    description: "Built on open-source technologies to ensure transparency and security.",

  }
];

function Features() {
  return (
    <section className="bg-gradient-to-br from-light-blue-100 to-light-purple-200 dark:from-dark-700 dark:to-dark-900 min-h-screen py-20 px-6 sm:px-12 text-center">
      <h1 className="relative group">
        <a href="/" className="fixed top-0 left-0 mt-4 ml-4 flex flex-col items-center">
          <MdOutlineKeyboardBackspace className="w-12 h-12 text-light-coral-500 dark:text-light-blue-500" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-light-coral-500 dark:text-light-blue-500 bg-light-blue-600 dark:bg-light-coral-800 font-semibold px-2 py-1 rounded-full text-sm">
            Go back
          </span>
        </a>
      </h1>
      <span className="text-xl font-bold text-dark-900 dark:text-neutral-100 ">
        Welcome to Our Features
      </span>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-dark-900 dark:text-neutral-100 mb-6">
          Powerful Features for Productivity
        </h2>
        <p className="text-dark-500 dark:text-neutral-300 mb-12">
          Everything you need to stay organized, focused, and efficient.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-dark-700 shadow-lg rounded-2xl flex flex-col items-center hover:scale-105 transition-transform"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-dark-800 dark:text-neutral-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-dark-500 dark:text-neutral-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="mt-12 bg-light-amber-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-light-amber-600 transition-colors">
        Ready to start? Sign up now!
      </button>
    </section>
  );
}
export default Features;