import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const handleSendParcel = data => {
        console.log(data);
    }

  return (
    <div className="flex justify-center bg-[#F4F6F8] px-4 py-10 w-full min-h-screen">
      <div className="bg-white shadow-lg p-10 rounded-2xl w-full max-w-6xl">

        <form onSubmit={handleSubmit(handleSendParcel)}>
            {/* Title */}
        <h1 className="font-bold text-gray-900 text-3xl">Send A Parcel</h1>
        <p className="mt-2 text-gray-600">Enter your parcel details</p>

        {/* Parcel Type Toggle */}
        <div className="flex items-center gap-8 mt-6 pb-4 border-b">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio" {...register("parcelType")}
                value="document" 
              className="w-4 h-4 text-green-600 radio" defaultChecked
            />
            <span className="font-medium text-gray-700">Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="not-document"
              {...register("parcelType")}
              className="w-4 h-4 text-green-600 radio"
            />
            <span className="font-medium text-gray-700">Not-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-6">
          <div>
            <label className="font-semibold text-sm">Parcel Name</label>
            <input
              type="text" {...register("parcelName")}
              className="px-3 py-2 border rounded-lg w-full"
              placeholder="Parcel Name"
            />
          </div>

          <div>
            <label className="font-semibold text-sm">Parcel Weight (KG)</label>
            <input
              type="number" {...register("parcelWeight")}
              className="px-3 py-2 border rounded-lg w-full"
              placeholder="Parcel Weight (KG)"
            />
          </div>
        </div>

        {/* Sender + Receiver Section */}
        <div className="gap-10 grid grid-cols-1 md:grid-cols-2 mt-10">

          {/* Sender */}
          <div>
            <h2 className="mb-4 font-semibold text-[#003B32] text-lg">Sender Details</h2>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Sender Name</label>
                <input type="text" {...register("senderName")} className="px-3 py-2 border rounded-lg w-full" placeholder="Sender Name" />
              </div>

              <div>
                <label className="font-semibold text-sm">Sender Address</label>
                <input type="text" {...register("senderAddress")} className="px-3 py-2 border rounded-lg w-full" placeholder="Address" />
              </div>

              <div>
                <label className="font-semibold text-sm">Sender Phone No</label>
                <input type="text" {...register("senderPhoneNo")}  className="px-3 py-2 border rounded-lg w-full" placeholder="Sender Phone No" />
              </div>

              <div>
  <label className="font-semibold text-sm">Your District</label>
  <select className="px-3 py-2 border rounded-lg w-full" {...register("senderDistrict")}>
    <option disabled selected hidden>Select your District</option>

    <option>Bagerhat</option>
    <option>Bandarban</option>
    <option>Barguna</option>
    <option>Barishal</option>
    <option>Bhola</option>
    <option>Bogura</option>
    <option>Brahmanbaria</option>
    <option>Chandpur</option>
    <option>Chattogram</option>
    <option>Chuadanga</option>
    <option>Comilla</option>
    <option>Cox's Bazar</option>
    <option>Dhaka</option>
    <option>Dinajpur</option>
    <option>Faridpur</option>
    <option>Feni</option>
    <option>Gaibandha</option>
    <option>Gazipur</option>
    <option>Gopalganj</option>
    <option>Habiganj</option>
    <option>Jamalpur</option>
    <option>Jashore</option>
    <option>Jhalokathi</option>
    <option>Jhenaidah</option>
    <option>Joypurhat</option>
    <option>Kishoreganj</option>
    <option>Khagrachhari</option>
    <option>Khulna</option>
    <option>Kurigram</option>
    <option>Kushtia</option>
    <option>Lakshmipur</option>
    <option>Lalmonirhat</option>
    <option>Madaripur</option>
    <option>Magura</option>
    <option>Manikganj</option>
    <option>Meherpur</option>
    <option>Moulvibazar</option>
    <option>Munshiganj</option>
    <option>Mymensingh</option>
    <option>Naogaon</option>
    <option>Narail</option>
    <option>Narayanganj</option>
    <option>Narsingdi</option>
    <option>Natore</option>
    <option>Netrokona</option>
    <option>Nilphamari</option>
    <option>Noakhali</option>
    <option>Pabna</option>
    <option>Panchagarh</option>
    <option>Patuakhali</option>
    <option>Pirojpur</option>
    <option>Rajbari</option>
    <option>Rajshahi</option>
    <option>Rangamati</option>
    <option>Rangpur</option>
    <option>Satkhira</option>
    <option>Shariatpur</option>
    <option>Sherpur</option>
    <option>Sirajganj</option>
    <option>Sunamganj</option>
    <option>Sylhet</option>
    <option>Tangail</option>
    <option>Thakurgaon</option>
  </select>
</div>


              <div>
                <label className="font-semibold text-sm">Pickup Instruction</label>
                <textarea className="px-3 py-2 border rounded-lg w-full" {...register("pickupInstruction")} placeholder="Pickup Instruction" rows="3"></textarea>
              </div>
            </div>
          </div>

          {/* Receiver */}
          <div>
            <h2 className="mb-4 font-semibold text-[#003B32] text-lg">Receiver Details</h2>

            <div className="space-y-4">
              <div>
                <label className="font-semibold text-sm">Receiver Name</label>
                <input type="text" {...register("receiverName")} className="px-3 py-2 border rounded-lg w-full" placeholder="Sender Name" />
              </div>

              <div>
                <label className="font-semibold text-sm">Receiver Address</label>
                <input type="text" {...register("receiverAddress")} className="px-3 py-2 border rounded-lg w-full" placeholder="Address" />
              </div>

              <div>
                <label className="font-semibold text-sm">Receiver Contact No</label>
                <input type="text" {...register("receiverContactNo")} className="px-3 py-2 border rounded-lg w-full" placeholder="Sender Contact No" />
              </div>

              <div>
  <label className="font-semibold text-sm">Receiver District</label>
  <select className="px-3 py-2 border rounded-lg w-full" {...register("receiverDistrict")}>
    <option disabled selected hidden>Select your District</option>

    <option>Bagerhat</option>
    <option>Bandarban</option>
    <option>Barguna</option>
    <option>Barishal</option>
    <option>Bhola</option>
    <option>Bogura</option>
    <option>Brahmanbaria</option>
    <option>Chandpur</option>
    <option>Chattogram</option>
    <option>Chuadanga</option>
    <option>Comilla</option>
    <option>Cox's Bazar</option>
    <option>Dhaka</option>
    <option>Dinajpur</option>
    <option>Faridpur</option>
    <option>Feni</option>
    <option>Gaibandha</option>
    <option>Gazipur</option>
    <option>Gopalganj</option>
    <option>Habiganj</option>
    <option>Jamalpur</option>
    <option>Jashore</option>
    <option>Jhalokathi</option>
    <option>Jhenaidah</option>
    <option>Joypurhat</option>
    <option>Kishoreganj</option>
    <option>Khagrachhari</option>
    <option>Khulna</option>
    <option>Kurigram</option>
    <option>Kushtia</option>
    <option>Lakshmipur</option>
    <option>Lalmonirhat</option>
    <option>Madaripur</option>
    <option>Magura</option>
    <option>Manikganj</option>
    <option>Meherpur</option>
    <option>Moulvibazar</option>
    <option>Munshiganj</option>
    <option>Mymensingh</option>
    <option>Naogaon</option>
    <option>Narail</option>
    <option>Narayanganj</option>
    <option>Narsingdi</option>
    <option>Natore</option>
    <option>Netrokona</option>
    <option>Nilphamari</option>
    <option>Noakhali</option>
    <option>Pabna</option>
    <option>Panchagarh</option>
    <option>Patuakhali</option>
    <option>Pirojpur</option>
    <option>Rajbari</option>
    <option>Rajshahi</option>
    <option>Rangamati</option>
    <option>Rangpur</option>
    <option>Satkhira</option>
    <option>Shariatpur</option>
    <option>Sherpur</option>
    <option>Sirajganj</option>
    <option>Sunamganj</option>
    <option>Sylhet</option>
    <option>Tangail</option>
    <option>Thakurgaon</option>
  </select>
</div>

              <div>
                <label className="font-semibold text-sm">Delivery Instruction</label>
                <textarea className="px-3 py-2 border rounded-lg w-full" {...register("deliveryInstruction")} placeholder="Delivery Instruction" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Time */}
        <p className="mt-6 text-gray-500 text-sm">
          * PickUp Time 4pm-7pm Approx.
        </p>

        {/* Submit Button */}
        <button
          className="hover:bg-lime-300 mt-6 px-6 py-2 rounded-lg font-semibold text-gray-900 transition btn btn-primary"
        >
          Proceed to Confirm Booking
        </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
