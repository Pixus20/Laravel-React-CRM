import { TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useRouter } from "next/navigation";

const DeleteTask = ({ taskId }) => {
   const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
      console.log('Task deleted:', response.data);
      alert('Task deleted successfully!');
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleDelete}
        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700"
      >
        <TrashIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default DeleteTask;
