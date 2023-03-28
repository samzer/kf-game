import Link from 'next/link';
import Head from 'next/head';


export default function Home() {
  return (
 <div className="min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: 'url(https://media.discordapp.net/attachments/1051763284946210870/1090197121250119790/n8r8t_As_a_growing_business_you_have_successfully_secured_inven_2428807e-4cdc-456d-be90-bd386ef95fe2.png?width=2050&height=1366)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <Head>
        <meta name="description" content="Test your matching skills by matching investors with small businesses and earn points in the process!" />
      </Head>
  <div className="bg-white bg-opacity-75 p-8 rounded-lg">
    <img src="/kickfurther-logo.png" alt="Kickfurther Logo" className="w-48 mx-auto mb-8" />
    <h1 className="text-4xl font-bold text-black mb-4">Welcome to the Kickfurther Matching Game</h1>
    <p className="text-lg text-black mb-8">
      Test your matching skills by matching investors with small businesses and earn points in the process!
    </p>
    <Link href="/game">
    <div className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer text-center">
          Start Playing
        </div>
  </Link>
  <div className="absolute bottom-8 right-8 p-4 bg-blue-500 text-white rounded-lg shadow-md">
    <p className="font-bold">
      Game Rules:
    </p>
    <ul className="list-disc pl-4 mt-2">
      <li>The game starts with a small business looking to secure financing for their inventory. The business will provide some details about their business and inventory needs.</li>
      <li>Players will be presented with a list of potential investors on Kickfurther, along with their investment criteria.</li>
      <li>The player’s goal is to match the small business with the most suitable investor(s) on Kickfurther. To do this, the player will need to read through the investment criteria and select the investors that are the best match for the small business.</li>
      <li>Once the player has made their selection, they will be given a score based on how well they matched the small business with the investors. The score will be based on factors such as the investor’s investment size, their interest rate, and their investment timeline.</li>
      <li>The game will end once the player has completed all levels or has failed to match the small business with the investors in the allotted time.</li>
    </ul>
  </div>
  </div>
</div>


  );
}