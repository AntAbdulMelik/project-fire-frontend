type Props = {
  className?: string;
  children?: React.ReactNode;
};

const Main = ({ className, children }: Props) => {
  return (
    <main className={`mb-32 mt-4 overflow-y-auto scrollbar-none ${className}`}>
      {children}
    </main>
  );
};

export default Main;
