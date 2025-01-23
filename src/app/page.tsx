export default async function Home() {
  const data = await fetch("https://api-noc.thiagomagano.com.br");
  const res = await data.json();

  return (
    <div className="grid place-items-center h-svh">
      <h1 className="font-bold text-5xl font-serif">{res.message}</h1>
    </div>
  );
}
