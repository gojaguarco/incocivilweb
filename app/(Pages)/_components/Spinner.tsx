const Spinner = () => {
  return (
    <div className="bg-accent1 h-12 w-12 rounded-full flex items-center justify-center">
      <div className="bg-light w-full h-4 transition-all items-center justify-center flex animate-spin">
        <div className="bg-light h-9 w-9 rounded-full " />
      </div>
    </div>
  );
};

export default Spinner;