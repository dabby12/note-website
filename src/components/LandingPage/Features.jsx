import { motion } from "framer-motion";
import { CheckCircleIcon, LightningBoltIcon, ShieldCheckIcon } from "@heroicons/react/outline";

const features = [
  {
    icon: <CheckCircleIcon className="w-12 h-12 text-light-blue-500" />, 
    title: "Seamless Note-Taking", 
    description: "Capture and organize notes effortlessly with our intuitive interface."
  },
  {
    icon: <LightningBoltIcon className="w-12 h-12 text-light-green-500" />, 
    title: "Lightning Fast Sync", 
    description: "Sync your notes across all devices instantly with our cloud integration."
  },
  {
    icon: <ShieldCheckIcon className="w-12 h-12 text-light-blue-700" />, 
    title: "Secure & Private", 
    description: "End-to-end encryption ensures your notes remain safe and private."
  }
];

function Features() {
  return (
    <section className="bg-gradient-to-br from-neutral-50 via-light-blue-50 to-light-green-50 dark:from-dark-800 dark:via-dark-700 dark:to-dark-600 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
            Powerful Features, <span className="text-light-blue-500 dark:text-light-blue-300">Seamless</span> Experience
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Everything you need to streamline your workflow and boost productivity.
          </p>
        </motion.div>
        
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="p-8 bg-white dark:bg-dark-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-light-blue-200 dark:hover:border-light-blue-700"
            >
              <div className="flex justify-center mb-6 bg-gradient-to-r from-light-blue-50 to-light-green-50 dark:from-dark-500 dark:to-dark-400 p-4 rounded-full w-20 h-20 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}  
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a href="/signup" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-light-blue-500 to-light-green-500 hover:from-light-blue-600 hover:to-light-green-600 text-white font-medium rounded-lg transition-colors duration-300">
            Ready to start? 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
