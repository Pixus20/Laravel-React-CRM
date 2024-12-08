// import axios from 'axios';

// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true, 
// });

// axiosClient.interceptors.request.use(
//   (config) => {
//     const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
//     if (csrfToken) {
//       config.headers['X-CSRF-TOKEN'] = csrfToken;
//     }

//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const registerUser = async (userData) => {
//   try {
//     const response = await axiosClient.post('/register', userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };

// export const loginUser = async (credentials) => {
//   try {
//     const response = await axiosClient.post('/login', credentials);
//     return response.data;
//   } catch (error) {
//     console.error('Error logging in user:', error);
//     throw error;
//   }
// };

// export const fetchUsers = async () => {
//   try {
//     const response = await axiosClient.get('/users');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };

// export const updateUserRole = async (userId, updatedData) => {
//   try {
//     const response = await axiosClient.put(`/user/${userId}`, updatedData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating user role:', error);
//     throw error;
//   }
// };

// export const fetchTasks = async () => {
//   try {
//     const response = await axiosClient.get('/tasks');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching tasks:', error);
//     throw error; 
//   }
// };


// export default axiosClient;



import axios from 'axios';

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, 
});

axiosClient.interceptors.request.use(
  (config) => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken;
    }

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  try {
    const response = await axiosClient.post('/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axiosClient.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axiosClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserRole = async (userId, updatedData) => {
  try {
    const response = await axiosClient.put(`/user/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};

export const fetchTasks = async () => {
  try {
    const response = await axiosClient.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; 
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("/me")
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTaskDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error in fetchTaskDetails:", error.response?.data || error.message);
    throw error;
  }
};
export default axiosClient;
