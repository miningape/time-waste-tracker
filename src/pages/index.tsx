import { Chart } from "../components/chart";

export default function Home() {
  return (
    <main
      className={`flex flex-col max-h-screen items-center pb-24 pt-10 px-5 justify-between`}
    >
      <h1 className="text-3xl mx-auto">Engineering Hours Wasted Due To VPN</h1>
      <Chart></Chart>
    </main>
  );
}
