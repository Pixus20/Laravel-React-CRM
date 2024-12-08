
const AddTimeBill = () => {
  return (
    <div>
      <label htmlFor="day"><b> Time per day</b></label>
      <input type="time" />
      <label htmlFor="select"><b> Select time</b></label>
      <select name="" id="" className="btn-add ml-2" >
         <option value="active">Active time</option>
         <option value="meet">Meet time</option>
      </select>
      <button className="btn-add ml-2">Add time</button>
    </div>
  )
}

export default AddTimeBill