import Image from "next/image";
import Link from "next/link";
import WalletConnectButton from "./WalletConnectButton"; // Adjust the import path

const NavigationBar = () => {
    return (
        <nav className="flex items-center justify-between px-4 py-0.5 custom-gradient text-white border-0 rounded-4xl ">

            <div className="flex items-center">

                <Link href="/">
                <div className="flex items-center space-x-4">
                    <Image
                        src="/Logo.svg"
                        alt="LuckyChain Logo"
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold">LuckyChain</span>
                </div>
                </Link>

                <div className="flex gap-12 border-l border-white/10 pl-5 ml-6">
                    <Link href="/lotteries" className="hover:text-gray-200">
                        Lotteries
                    </Link>
                    <Link href="/community" className="hover:text-gray-200">
                        Community
                    </Link>
                    <Link href="/about" className="hover:text-gray-200">
                        About us
                    </Link>
                </div>
            </div>
            <div>
                <WalletConnectButton className="bg-white text-black hover:bg-gray-200" />
            </div>
        </nav>
    );
};

export default NavigationBar;