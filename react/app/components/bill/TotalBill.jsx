// "use client";

// import { useEffect, useState } from "react";
// import axios from "../../axios-client";

// const TotalBill = () => {
//   const [totalBill, setTotalBill] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTotalBill = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/tasks/total-bill");
//         setTotalBill(response.data.total_bill);
//       } catch (err) {
//         setError("Failed to fetch total bill. Please try again.");
//       }
//     };

//     fetchTotalBill();
//   }, []);

//   return (
//     <div>
//       <b>Bill per months:</b>{" "}
//       {error ? (
//         <span className="text-red-500">{error}</span>
//       ) : (
//         <span>${totalBill !== null ? totalBill : "Loading..."}</span>
//       )}
//     </div>
//   );
// };

// export default TotalBill;



import { useEffect, useState } from "react";
import axios from "../../axios-client";

const TotalBill = () => {
  const [totalBill, setTotalBill] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalBill = async () => {
      try {
        const response = await axios.get("/total-bill", {
          params: {
            month: 12, 
            year: 2024, 
          },
        });
        setTotalBill(response.data.total_bill);
      } catch (err) {
        setError("Failed to fetch total bill. Please try again.");
      }
    };
    

    fetchTotalBill();
  }, []);

  return (
    <div>
      <b>Bill per months:</b>{" "}
      {error ? (
        <span className="text-red-500">{error}</span>
      ) : (
        <span>${totalBill !== null ? totalBill : "Loading..."}</span>
      )}
    </div>
  );
};

export default TotalBill;
