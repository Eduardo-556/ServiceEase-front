export default function SpinnerLoading() {
  return (
    <div className="flex justify-center items-center h-screen bg-primeiroPlano">
      <div className="border-t-4 border-azulClaro border-solid rounded-full h-10 w-10 animate-spin dark:bg-primeiroPlano "></div>
    </div>
  );
}
