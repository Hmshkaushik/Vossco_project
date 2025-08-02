import { FaSpinner } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <FaSpinner className="animate-spin text-3xl text-blue-500" />
    </div>
  );
};

export default LoadingSpinner;