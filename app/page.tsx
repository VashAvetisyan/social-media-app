import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";
import Widgets from "@/components/Widgets";
import SingUpPrompt from "@/components/SingUpPrompt";
import CommentModal from "@/components/modals/CommentModal";
import LoadingScreen from "@/components/modals/LoadingScreen";

export default function Home() {
	return (
		<>
			<div className="text-[#0F1419] min-h-screen max-w-[1400px] mx-auto flex justify-center pb-[80px]">
				<Sidebar />
				<PostFeed />
				<Widgets />
			</div>
			<CommentModal />
			<SingUpPrompt />
			<LoadingScreen />
		</>
	);
}
