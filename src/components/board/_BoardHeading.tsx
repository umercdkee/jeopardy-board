function BoardHeading({ children }: { children: string }) {
  return (
    <h2 className="text-yellow-200 min-w-0 text-2xl leading-tight self-end m-0 p-0">
      {children}
    </h2>
  );
}
export default BoardHeading;
