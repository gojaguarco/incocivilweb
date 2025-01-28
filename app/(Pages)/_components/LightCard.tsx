const LightCard = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <section className="bg-light-dark text-dark rounded-xl px-10 py-6">
      {children}
    </section>

  );
}

export default LightCard;