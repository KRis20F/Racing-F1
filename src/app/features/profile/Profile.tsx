const Profile = () => {
  const invoices = [
    {
      date: "March, 01, 2020",
      id: "MS-415646",
      amount: 180,
    },
    {
      date: "February, 10, 2020",
      id: "RV-126749",
      amount: 250,
    },
    {
      date: "April, 05, 2020",
      id: "FB-212562",
      amount: 560,
    },
    {
      date: "June, 25, 2019",
      id: "QW-103578",
      amount: 120,
    },
    {
      date: "March, 01, 2019",
      id: "AR-803481",
      amount: 300,
    },
  ];

  const billingInfo = [
    {
      name: "Oliver Liam",
      company: "Viking Burrito",
      email: "oliver@burrito.com",
      vatNumber: "FRB1235476",
    },
    {
      name: "Lucas Harper",
      company: "Stone Tech Zone",
      email: "lucas@stone-tech.com",
      vatNumber: "FRB1235476",
    },
    {
      name: "Ethan James",
      company: "Fiber Notion",
      email: "ethan@fiber.com",
      vatNumber: "FRB1235476",
    },
  ];

  const transactions = [
    {
      name: "Netflix",
      date: "27 March 2021, at 12:30 PM",
      amount: -2500,
      status: "negative",
    },
    {
      name: "Apple",
      date: "27 March 2021, at 12:30 PM",
      amount: 2500,
      status: "positive",
    },
    {
      name: "Stripe",
      date: "26 March 2021, at 13:45 PM",
      amount: 800,
      status: "positive",
    },
    {
      name: "HubSpot",
      date: "26 March 2021, at 12:30 PM",
      amount: 1700,
      status: "positive",
    },
    {
      name: "Webflow",
      date: "26 March 2021, at 05:00 PM",
      amount: 0,
      status: "pending",
    },
    {
      name: "Microsoft",
      date: "25 March 2021, at 16:30 PM",
      amount: -987,
      status: "negative",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1B1B3A] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl mb-6">Billing</h1>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* div1 - Vision UI Card */}
          <div className="col-span-4 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-700 rounded-2xl p-6">
            <div className="h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <span className="text-lg font-medium">Vision UI</span>
                <div className="flex -space-x-3">
                  <div className="w-7 h-7 rounded-full bg-white/80"></div>
                  <div className="w-7 h-7 rounded-full bg-white/40"></div>
                </div>
              </div>
              <div>
                <div className="font-mono text-xl tracking-widest mb-4">
                  7812 2139 0823 XXXX
                </div>
                <div className="flex gap-6">
                  <div>
                    <div className="text-xs text-white/60">VALID THRU</div>
                    <div className="text-sm">05/24</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60">CVV</div>
                    <div className="text-sm">09X</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* div2 - Credit Balance */}
          <div className="col-span-4 bg-[#111c44] rounded-2xl p-6">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg text-white/80">Credit Balance</h3>
                  <div className="text-3xl font-bold mt-2">$25,215</div>
                </div>
                <button className="text-2xl text-white/60">•••</button>
              </div>
              <div className="mt-auto">
                <div className="text-xs text-white/60 mb-3">NEWEST</div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-500">$</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Bill & Taxes</div>
                    <div className="text-sm text-white/60">Today, 16:36</div>
                  </div>
                  <div className="text-red-500">-$154.50</div>
                </div>
              </div>
            </div>
          </div>

          {/* div3 - Invoices */}
          <div className="col-span-4 row-span-5 bg-[#111c44] rounded-2xl p-6">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Invoices</h3>
                <button className="px-4 py-2 bg-indigo-600 rounded-xl text-sm">
                  VIEW ALL
                </button>
              </div>
              <div className="space-y-4 overflow-y-auto flex-grow">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <div className="text-sm">{invoice.date}</div>
                      <div className="text-sm text-white/60">#{invoice.id}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span>${invoice.amount}</span>
                      <button className="px-3 py-1 text-sm hover:bg-white/10 rounded">
                        PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* div4 - Payment Method */}
          <div className="col-span-4 row-span-3 bg-[#111c44] rounded-2xl p-6">
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <button className="px-4 py-2 bg-indigo-600 rounded-xl text-sm">
                  ADD A NEW CARD
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-[#1a275b] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-red-500">MC</span>
                    </div>
                    <span className="font-mono">7812 2139 0823 XXXX</span>
                  </div>
                  <button className="text-white/60 hover:text-white">
                    Edit
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#1a275b] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-blue-500">V</span>
                    </div>
                    <span className="font-mono">7812 2139 0823 XXXX</span>
                  </div>
                  <button className="text-white/60 hover:text-white">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Billing Information */}
          <div className="col-span-7 bg-[#111C44] rounded-[20px] p-8">
            <h3 className="text-xl font-medium mb-6">Billing Information</h3>
            <div className="space-y-4">
              {billingInfo.map((info, index) => (
                <div key={index} className="bg-[#0B1437] rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-medium">{info.name}</h4>
                    <div className="flex gap-4">
                      <button className="text-red-500 flex items-center gap-2">
                        <span className="text-sm">DELETE</span>
                      </button>
                      <button className="text-white/60 hover:text-white flex items-center gap-2">
                        <span className="text-sm">EDIT</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-white/60">
                    <p>
                      Company Name:{" "}
                      <span className="text-white/40">{info.company}</span>
                    </p>
                    <p>
                      Email Address:{" "}
                      <span className="text-white/40">{info.email}</span>
                    </p>
                    <p>
                      VAT Number:{" "}
                      <span className="text-white/40">{info.vatNumber}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Transactions */}
          <div className="col-span-5 bg-[#111C44] rounded-[20px] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium">Your Transactions</h3>
              <div className="flex items-center gap-2 text-white/60">
                <span className="text-sm">23 - 30 March 2021</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="text-sm text-white/60">NEWEST</div>
              {transactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        transaction.status === "positive"
                          ? "bg-emerald-500/20"
                          : transaction.status === "negative"
                          ? "bg-red-500/20"
                          : "bg-gray-500/20"
                      }`}
                    >
                      <span
                        className={`text-2xl
                        ${
                          transaction.status === "positive"
                            ? "text-emerald-500"
                            : transaction.status === "negative"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        {transaction.status === "positive"
                          ? "↑"
                          : transaction.status === "negative"
                          ? "↓"
                          : "!"}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-sm text-white/60">
                        {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`text-lg
                    ${
                      transaction.status === "positive"
                        ? "text-emerald-500"
                        : transaction.status === "negative"
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {transaction.status === "pending"
                      ? "Pending"
                      : `${transaction.amount < 0 ? "-" : "+"} $${Math.abs(
                          transaction.amount
                        ).toLocaleString()}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
