import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: item * 0.1 }}
          className="bg-surface rounded-xl p-4 shadow-sm"
        >
          <div className="flex items-start space-x-4">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded animate-pulse w-1/2" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;