// components/Sidebar.jsx
import { motion } from 'framer-motion';

const Sidebar = ({ pictures, onSelect }) => {
  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-lg font-bold mb-4">Picture Options</h2>
      <div className="grid grid-cols-2 gap-4">
        {pictures.map((picture, index) => (
          <motion.div
            key={index}
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(picture)}
          >
            <img src={picture.url} alt={picture.name} className="w-full rounded-lg shadow" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
