export default async function Home() {
  //@ts-ignore
  const data = await fetch(process.env?.API_URL);
  const res = await data.json();

  return (
    <div className="grid place-items-center h-svh">
      <h1 className="font-bold text-5xl font-serif">{res.message}</h1>
    </div>
  );
}
