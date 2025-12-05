import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  const sendersRegion = useWatch({ control, name: "senderRegion" });
  const receiversRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionsDistricts = serviceCenters.filter((c) => c.region === region);
    return regionsDistricts.map((d) => d.district);
  };

  const handleSendParcel = (data) => {
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistricts === data.receiverDistricts;
    const parcelWeight = parseFloat(data.parcelWeight);

    let deliveryCharge = 0;

    if (isDocument) {
      deliveryCharge = isSameDistrict ? 50 : 100;
    } else {
      if (parcelWeight <= 3) {
        deliveryCharge = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        deliveryCharge = minCharge + extraCharge;
      }
    }

    Swal.fire({
      title: "Agree with the Cost?",
      text: `Your delivery charge is ${deliveryCharge} BDT`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16A34A",
      cancelButtonColor: "#d33",
      confirmButtonText: "I Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving parcel", res.data);
        });
      }
    });
  };

  // 🔥 CUSTOM INPUT STYLE → beautiful primary focus (green)
  const inputStyle =
    "px-3 py-2 border rounded-lg w-full bg-white outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition";

  return (
    <div className="flex justify-center bg-[#F4F6F8] px-4 py-10 w-full min-h-screen">
      <div className="bg-white shadow-xl p-10 border border-gray-100 rounded-2xl w-full max-w-6xl">

        <form onSubmit={handleSubmit(handleSendParcel)}>
          <h1 className="font-bold text-gray-900 text-3xl">Send A Parcel</h1>
          <p className="mt-1 text-gray-600 text-sm">Enter your parcel details</p>

          {/* Parcel Type */}
          <div className="flex items-center gap-8 mt-6 pb-5 border-gray-200 border-b">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="w-4 h-4 accent-green-600"
                defaultChecked
              />
              <span className="font-medium text-gray-700">Document</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="not-document"
                {...register("parcelType")}
                className="w-4 h-4 accent-green-600"
              />
              <span className="font-medium text-gray-700">Not-Document</span>
            </label>
          </div>

          {/* Parcel Info */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-6">
            <div>
              <label className="font-semibold text-sm">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                className={inputStyle}
                placeholder="Parcel Name"
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Parcel Weight (KG)</label>
              <input
                type="number"
                {...register("parcelWeight")}
                className={inputStyle}
                placeholder="Parcel Weight (KG)"
              />
            </div>
          </div>

          {/* Sender + Receiver */}
          <div className="gap-12 grid grid-cols-1 lg:grid-cols-2 mt-10">

            {/* Sender */}
            <div>
              <h2 className="mb-4 font-semibold text-[#003B32] text-lg">
                Sender Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-sm">Sender Name</label>
                  <input
                    type="text"
                    {...register("senderName")}
                    defaultValue={user?.displayName}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Sender Email</label>
                  <input
                    type="email"
                    {...register("senderEmail")}
                    defaultValue={user?.email}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Sender Phone No
                  </label>
                  <input
                    type="text"
                    {...register("senderPhoneNo")}
                    className={inputStyle}
                  />
                </div>

                {/* Sender Region */}
                <div>
                  <label className="font-semibold text-sm">Sender Region</label>
                  <select
                    {...register("senderRegion")}
                    defaultValue="Pick  a region"
                    className={inputStyle}
                  >
                    <option disabled>Pick a region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Sender District */}
                <div>
                  <label className="font-semibold text-sm">Sender District</label>
                  <select
                    {...register("senderDistricts")}
                    defaultValue="Pick  a district"
                    className={inputStyle}
                  >
                    <option disabled>Pick a district</option>
                    {districtsByRegion(sendersRegion)?.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Pickup Instruction
                  </label>
                  <textarea
                    {...register("pickupInstruction")}
                    className={inputStyle}
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Receiver */}
            <div>
              <h2 className="mb-4 font-semibold text-[#003B32] text-lg">
                Receiver Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-sm">Receiver Name</label>
                  <input
                    type="text"
                    {...register("receiverName")}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Receiver Email</label>
                  <input
                    type="email"
                    {...register("receiverEmail")}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Receiver Contact No
                  </label>
                  <input
                    type="text"
                    {...register("receiverContactNo")}
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">Receiver Region</label>
                  <select
                    {...register("receiverRegion")}
                    defaultValue="Pick  a region"
                    className={inputStyle}
                  >
                    <option disabled>Pick a region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Receiver District
                  </label>
                  <select
                    {...register("receiverDistricts")}
                    defaultValue="Pick  a district"
                    className={inputStyle}
                  >
                    <option disabled>Pick a district</option>
                    {districtsByRegion(receiversRegion)?.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-sm">
                    Delivery Instruction
                  </label>
                  <textarea
                    {...register("deliveryInstruction")}
                    className={inputStyle}
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-gray-500 text-sm">
            * PickUp Time 4pm-7pm Approx.
          </p>

          <button className="bg-green-500 hover:bg-green-700 mt-6 px-6 py-3 rounded-lg w-full md:w-auto font-semibold text-white transition">
            Proceed to Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;
