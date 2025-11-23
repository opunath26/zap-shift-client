import { FaShippingFast } from "react-icons/fa";

export default function Work() {
  const cards = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaShippingFast className="mx-auto text-4xl" />,
    },
    {
      title: "Cash On Delivery",
      desc: "Quick, reliable delivery with real-time tracking at your fingertips.",
      icon: <FaShippingFast className="mx-auto text-4xl" />,
    },
    {
      title: "Delivery Hub",
      desc: "Your package is handled with care from pickup to final destination.",
      icon: <FaShippingFast className="mx-auto text-4xl" />,
    },
    {
      title: "Booking SME & Corporate",
      desc: "We’re here anytime — get help whenever you need it.",
      icon: <FaShippingFast className="mx-auto text-4xl" />,
    },
  ];

  return (
    <section className="p-16">
      <div className="mx-auto px-4 max-w-6xl">
        <h2 className="mb-10 font-bold text-secondary text-4xl">How it Works</h2>

        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-gray-50 shadow hover:shadow-lg p-6 border rounded-2xl transition"
            >
              <div className="mb-4 text-primary">{card.icon}</div>
              <h3 className="mb-2 font-semibold text-xl">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}