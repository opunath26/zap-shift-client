import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: "document",
      parcelWeight: 1,
    },
  });

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Load service centers data
  const serviceCenters = useLoaderData() || [];
  const regionsDuplicate = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicate)];

  // Form watchers for dynamic pricing and district lists
  const sendersRegion = useWatch({ control, name: "senderRegion" });
  const receiversRegion = useWatch({ control, name: "receiverRegion" });
  const parcelType = useWatch({ control, name: "parcelType" });
  const parcelWeight = useWatch({ control, name: "parcelWeight" });
  const senderDistrict = useWatch({ control, name: "senderDistricts" });
  const receiverDistrict = useWatch({ control, name: "receiverDistricts" });

  const districtsByRegion = (region) => {
    if (!region) return [];
    const regionsDistricts = serviceCenters.filter((c) => c.region === region);
    return [...new Set(regionsDistricts.map((d) => d.district))];
  };

  // 💰 Delivery Fee Calculation Logic
  const calculateCost = () => {
    const isDocument = parcelType === "document";
    const isSameDistrict =
      senderDistrict && receiverDistrict && senderDistrict === receiverDistrict;
    const weight = parseFloat(parcelWeight) || 0;

    let charge = 0;

    if (isDocument) {
      charge = isSameDistrict ? 50 : 100;
    } else {
      if (weight <= 3) {
        charge = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = weight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        charge = minCharge + extraCharge;
      }
    }
    return charge;
  };

  const estimatedCost = calculateCost();

  const handleSendParcel = async (data) => {
    const deliveryCharge = calculateCost();

    const result = await Swal.fire({
      title: "Confirm Booking?",
      text: `Total Delivery Charge is ${deliveryCharge} BDT`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#03373D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm Booking",
    });

    if (result.isConfirmed) {
      try {
        // Construct standard parcel payload matching Prisma backend
        const parcelPayload = {
          senderName: user?.displayName || data.senderName,
          senderEmail: user?.email || data.senderEmail,
          senderPhone: data.senderPhoneNo,
          senderAddress: `${data.senderDistricts}, ${data.senderRegion} (${data.pickupInstruction || ''})`,
          
          receiverName: data.receiverName,
          receiverPhone: data.receiverContactNo,
          receiverAddress: `${data.receiverDistricts}, ${data.receiverRegion} (${data.deliveryInstruction || ''})`,
          
          parcelType: data.parcelType,
          parcelWeight: parseFloat(data.parcelWeight) || 0,
          cost: parseFloat(deliveryCharge),
          status: "pending",
          bookingDate: new Date().toISOString(),
        };

        const res = await axiosSecure.post("/parcels", parcelPayload);

        if (res.data.insertedId || res.data.id) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Parcel booking requested successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/dashboard/my-parcels");
        }
      } catch (error) {
        console.error("Error creating parcel booking:", error);
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: error.response?.data?.error || error.message || "Failed to process parcel request.",
          confirmButtonColor: "#03373D",
        });
      }
    }
  };

  const inputStyle =
    "px-3 py-2.5 border border-gray-200 rounded-xl w-full bg-gray-50/60 focus:bg-white outline-none focus:ring-2 focus:ring-[#03373D] focus:border-[#03373D] text-sm text-[#03373D] transition";

  return (
    <div className="flex justify-center bg-[#F4F6F8] px-4 py-8 w-full min-h-screen">
      <div className="bg-white shadow-lg p-6 sm:p-10 border border-gray-100 rounded-2xl w-full max-w-6xl">
        <form onSubmit={handleSubmit(handleSendParcel)}>
          <div className="flex md:flex-row flex-col justify-between items-start md:items-center pb-4 border-b">
            <div>
              <h1 className="font-extrabold text-[#03373D] text-2xl sm:text-3xl">
                Send A Parcel
              </h1>
              <p className="mt-1 text-gray-500 text-xs sm:text-sm">
                Fill in the details below to schedule your delivery
              </p>
            </div>
            
            {/* Real-time Estimated Cost Display */}
            <div className="bg-[#03373D]/10 mt-3 md:mt-0 px-4 py-2 rounded-xl text-left md:text-right">
              <span className="block font-semibold text-gray-500 text-xs uppercase">
                Estimated Cost
              </span>
              <span className="font-extrabold text-[#03373D] text-xl sm:text-2xl">
                ৳ {estimatedCost} BDT
              </span>
            </div>
          </div>

          {/* Parcel Type */}
          <div className="flex items-center gap-8 mt-6 pb-5 border-gray-100 border-b">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="w-4 h-4 accent-[#03373D]"
              />
              <span className="font-semibold text-gray-700 text-sm">Document</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="not-document"
                {...register("parcelType")}
                className="w-4 h-4 accent-[#03373D]"
              />
              <span className="font-semibold text-gray-700 text-sm">Not-Document</span>
            </label>
          </div>

          {/* Parcel Info */}
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 mt-6">
            <div>
              <label className="block mb-1 font-bold text-[#03373D] text-xs">
                Parcel Title/Name *
              </label>
              <input
                type="text"
                {...register("parcelName", { required: "Parcel name is required" })}
                className={inputStyle}
                placeholder="e.g. Legal Documents, Electronics"
              />
              {errors.parcelName && (
                <span className="text-red-500 text-xs">{errors.parcelName.message}</span>
              )}
            </div>

            <div>
              <label className="block mb-1 font-bold text-[#03373D] text-xs">
                Parcel Weight (KG) *
              </label>
              <input
                type="number"
                step="0.1"
                min="0.5"
                {...register("parcelWeight", { required: "Weight is required" })}
                className={inputStyle}
                placeholder="Weight in KG"
              />
              {errors.parcelWeight && (
                <span className="text-red-500 text-xs">{errors.parcelWeight.message}</span>
              )}
            </div>
          </div>

          {/* Sender + Receiver Sections */}
          <div className="gap-8 lg:gap-12 grid grid-cols-1 lg:grid-cols-2 mt-8">
            
            {/* Sender Section */}
            <div className="bg-gray-50/50 p-5 border border-gray-100 rounded-2xl">
              <h2 className="mb-4 pb-2 border-b font-bold text-[#03373D] text-base">
                Sender Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    {...register("senderName")}
                    defaultValue={user?.displayName || ""}
                    readOnly
                    className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    {...register("senderEmail")}
                    defaultValue={user?.email || ""}
                    readOnly
                    className={`${inputStyle} bg-gray-100 cursor-not-allowed`}
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Sender Phone No *
                  </label>
                  <input
                    type="tel"
                    {...register("senderPhoneNo", { required: "Sender phone is required" })}
                    className={inputStyle}
                    placeholder="017XXXXXXXX"
                  />
                  {errors.senderPhoneNo && (
                    <span className="text-red-500 text-xs">{errors.senderPhoneNo.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Sender Region *
                  </label>
                  <select
                    {...register("senderRegion", { required: "Region is required" })}
                    defaultValue=""
                    className={inputStyle}
                  >
                    <option value="" disabled>Select Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.senderRegion && (
                    <span className="text-red-500 text-xs">{errors.senderRegion.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Sender District *
                  </label>
                  <select
                    {...register("senderDistricts", { required: "District is required" })}
                    defaultValue=""
                    className={inputStyle}
                    disabled={!sendersRegion}
                  >
                    <option value="" disabled>Select District</option>
                    {districtsByRegion(sendersRegion)?.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.senderDistricts && (
                    <span className="text-red-500 text-xs">{errors.senderDistricts.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Pickup Address / Instruction
                  </label>
                  <textarea
                    {...register("pickupInstruction")}
                    className={inputStyle}
                    rows="2"
                    placeholder="House, Road, Area details..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Receiver Section */}
            <div className="bg-gray-50/50 p-5 border border-gray-100 rounded-2xl">
              <h2 className="mb-4 pb-2 border-b font-bold text-[#03373D] text-base">
                Receiver Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Receiver Name *
                  </label>
                  <input
                    type="text"
                    {...register("receiverName", { required: "Receiver name is required" })}
                    className={inputStyle}
                    placeholder="Recipient Full Name"
                  />
                  {errors.receiverName && (
                    <span className="text-red-500 text-xs">{errors.receiverName.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Receiver Email
                  </label>
                  <input
                    type="email"
                    {...register("receiverEmail")}
                    className={inputStyle}
                    placeholder="receiver@example.com (optional)"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Receiver Contact No *
                  </label>
                  <input
                    type="tel"
                    {...register("receiverContactNo", { required: "Receiver contact number is required" })}
                    className={inputStyle}
                    placeholder="018XXXXXXXX"
                  />
                  {errors.receiverContactNo && (
                    <span className="text-red-500 text-xs">{errors.receiverContactNo.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Receiver Region *
                  </label>
                  <select
                    {...register("receiverRegion", { required: "Region is required" })}
                    defaultValue=""
                    className={inputStyle}
                  >
                    <option value="" disabled>Select Region</option>
                    {regions.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.receiverRegion && (
                    <span className="text-red-500 text-xs">{errors.receiverRegion.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Receiver District *
                  </label>
                  <select
                    {...register("receiverDistricts", { required: "District is required" })}
                    defaultValue=""
                    className={inputStyle}
                    disabled={!receiversRegion}
                  >
                    <option value="" disabled>Select District</option>
                    {districtsByRegion(receiversRegion)?.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.receiverDistricts && (
                    <span className="text-red-500 text-xs">{errors.receiverDistricts.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-semibold text-gray-700 text-xs">
                    Delivery Address / Instruction
                  </label>
                  <textarea
                    {...register("deliveryInstruction")}
                    className={inputStyle}
                    rows="2"
                    placeholder="Detailed delivery address..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-row flex-col justify-between items-center gap-4 mt-8 pt-4 border-t">
            <p className="text-gray-500 text-xs">
              * Standard PickUp Time: 4:00 PM - 7:00 PM Approx.
            </p>

            <button
              type="submit"
              className="bg-[#C7EA52] hover:bg-[#b8dd42] shadow-sm hover:shadow-md px-8 py-3 rounded-xl w-full md:w-auto font-bold text-[#03373D] text-sm active:scale-[0.99] transition-all cursor-pointer"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;