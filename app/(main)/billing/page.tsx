// "use client"
// import { Button } from "@/components/ui/button";
// import { CheckIcon } from "lucide-react";
// import { useSession } from "next-auth/react";
// import Link from "next/link";

// const Billing = () => {
//   const session = useSession();
//   // @ts-ignore
//   const multiFactor = parseInt(session.data?.user?.multiFactor)? parseInt(session.data?.user?.multiFactor) : 1;

//   return (
//     <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-[100vh]">
//       <main className="flex-1 bg-[#c4bbbb07] p-8 m-8 rounded-2xl mr-5">
//         <h2 className="text-2xl font-bold mb-8">Billing</h2>
//         <section className="w-ful flex items-center justify-center">
//           <div className="container px-4 md:px-6">
//             <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
//               <div className="dark:bg-zinc-850  bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10 flex flex-col justify-between flex-1 min-w-[300px] p-6">
//                 <div>
//                   <h3 className="text-2xl font-bold text-center">Basic</h3>
//                   <div className="mt-4 text-center text-[#63beb7]">
//                     <span className="text-4xl font-bold text-[#63beb7]">
//                       $1000
//                     </span>
//                     / month
//                   </div>
//                   <ul className="mt-4 space-y-2">
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-xs bg-green-500 rounded-full mr-2 p-1" />
//                       2000 Voicetta Coins
//                     </li>
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-xs bg-green-500 rounded-full mr-2 p-1" />
//                       ${0.05*multiFactor} per minute
//                     </li>
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-xs bg-green-500 rounded-full mr-2 p-1" />
//                       Standard Support
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="mt-6">
//                   <Link href={"/support"}>
//                     <Button className="w-full overflow-hidden text-ellipsis ml-1 bg-[#183534] hover:bg-[#183534] p-3 rounded-lg shadow-sm">
//                       Get Started
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//               <div className="relative flex flex-col p-6 justify-between border-purple-500 dark:bg-zinc-850  bg-[#ffffff07] border border-white/5 rounded-2xl shadow-lg shadow-black/10  flex-1 min-w-[300px]">
//                 <div className="px-3 py-1 text-sm  bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                   Popular
//                 </div>
//                 <div>
//                   <h3 className="text-2xl font-bold text-center">Pro</h3>
//                   <div className="mt-4 text-center text-[#63beb7]">
//                     <span className="text-4xl font-bold">$2000</span>/ month
//                   </div>
//                   <ul className="mt-4 space-y-2">
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-2xs bg-green-500 rounded-full mr-2 p-1" />
//                       5000 Voicetta Coins
//                     </li>
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-xs bg-green-500 rounded-full mr-2 p-1" />
//                       ${0.05*multiFactor} per minute
//                     </li>
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-xs bg-green-500 rounded-full mr-2 p-1" />
//                       Higher Usage Limits
//                     </li>
//                     <li className="flex items-center">
//                       <CheckIcon className=" text-xs bg-green-500 rounded-full mr-2 p-1" />
//                       Priority Support
//                     </li>
//                   </ul>
//                 </div>
//                 <div className="mt-6">
//                   <Link href={"/support"}>
//                     <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
//                       Get Started
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Billing;
