
const AllTimeBill = () => {
   return (
      <div className="overflow-x-auto">
         <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
               <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2">Duration (hours)</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
               </tr>
            </thead>
            <tbody>
                  <tr className="hover:bg-gray-100">
                     <td className="border border-gray-300 px-4 py-2 text-center"></td>
                     <td className="border border-gray-300 px-4 py-2 text-center"></td>
                  </tr>
            </tbody>
         </table>
      </div>
   );
}

export default AllTimeBill