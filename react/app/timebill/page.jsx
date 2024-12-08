import DefaultLayout from "../components/DefaultLayout"
import AddTimeBill from "../components/TimeBill/AddTimeBill"
import AllTimeBill from "../components/TimeBill/AllTimeBill"

const TimeBill = () => {
  return (
   <DefaultLayout>
      <div>
         <AllTimeBill/>
         <div className="mt-5">
            <AddTimeBill />
         </div>
      </div>
   </DefaultLayout>
  )
}

export default TimeBill