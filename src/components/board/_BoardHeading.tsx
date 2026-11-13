function BoardHeading({ children }: { children: string }) {
  return (
    <h2 className="text-yellow-200 text-xl md:text-2xl leading-tight self-end m-0 p-0">
      {children}
    </h2>
  );
}
export default BoardHeading;
