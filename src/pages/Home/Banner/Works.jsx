import { 
  FaBoxOpen, 
  FaHandHoldingUsd, 
  FaWarehouse, 
  FaBuilding 
} from "react-icons/fa";

export default function Work() {
  const cards = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaBoxOpen className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Cash On Delivery",
      desc: "Quick, reliable delivery with real-time tracking and instant payout at your fingertips.",
      icon: <FaHandHoldingUsd className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Delivery Hub",
      desc: "Your package is handled with utmost care from sorting hub to final destination.",
      icon: <FaWarehouse className="text-3xl sm:text-4xl" />,
    },
    {
      title: "Booking SME & Corporate",
      desc: "Tailored logistics solutions and dedicated support whenever your business needs it.",
      icon: <FaBuilding className="text-3xl sm:text-4xl" />,
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-bold text-secondary text-3xl sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-2 text-gray-500 text-sm sm:text-base">
            Simple and seamless steps to handle all your parcel & courier logistics
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="group flex flex-col items-center bg-gray-50 hover:bg-white shadow-sm hover:shadow-xl p-6 border border-gray-100 hover:border-primary/30 rounded-2xl text-center transition-all hover:-translate-y-1 duration-300"
            >
              <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary mb-5 border border-primary/20 rounded-2xl w-16 h-16 text-primary group-hover:text-white transition-all duration-300">
                {card.icon}
              </div>
              <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}