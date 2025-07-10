import Blog from "@/components/Blog";
import Slider from "@/components/Slider";
import Subscribe from "@/components/Subscribe";


export default function Home() {
  return (
    <div className="space-y-12 py-8 px-4 md:px-12">
      <Slider />
      <Blog />
      <Subscribe />
    </div>
  );
}
