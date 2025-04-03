import Logo from "../../../assets/guci.svg";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#1a1b1e] flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-white mb-12">
          Welcome to Racing F1
        </h1>
        <div className="w-64 h-64 mx-auto">
          <img src={Logo} alt="Logo" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default Home;
