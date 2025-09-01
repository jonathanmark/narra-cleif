import svgPaths from "./svg-v89zvlr7au";
import imgShape from "figma:asset/11dbcb982f9ba115c7d5cc790cc48a457815fb67.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

function Figma() {
  return (
    <div className="h-[35px] relative shrink-0 w-10" data-name="Figma">
      <div className="absolute bottom-[-5%] left-0 right-0 top-[-5%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 40 39"
        >
          <g id="Figma">
            <path
              d={svgPaths.p3dcd040}
              id="Icon"
              stroke="var(--stroke-0, #1E1E1E)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Block() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-6 items-center justify-start p-0 relative shrink-0"
      data-name="Block"
    >
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[24px] text-left text-nowrap">
        <p className="block leading-[1.2]">Narra Cliffs</p>
      </div>
    </div>
  );
}

function NavigationPill() {
  return (
    <div
      className="bg-neutral-100 box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Properties</p>
      </div>
    </div>
  );
}

function NavigationPill1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Solutions</p>
      </div>
    </div>
  );
}

function NavigationPill2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Community</p>
      </div>
    </div>
  );
}

function NavigationPill3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Resources</p>
      </div>
    </div>
  );
}

function NavigationPill4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Pricing</p>
      </div>
    </div>
  );
}

function NavigationPill5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Contact</p>
      </div>
    </div>
  );
}

function NavigationPill6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-center p-[8px] relative rounded-lg shrink-0"
      data-name="Navigation Pill"
    >
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Link</p>
      </div>
    </div>
  );
}

function NavigationPillList() {
  return (
    <div
      className="[flex-flow:wrap] basis-0 box-border content-start flex gap-2 grow items-start justify-end min-h-px min-w-px p-0 relative shrink-0"
      data-name="Navigation Pill List"
    >
      <NavigationPill />
      <NavigationPill1 />
      <NavigationPill2 />
      <NavigationPill3 />
      <NavigationPill4 />
      <NavigationPill5 />
      <NavigationPill6 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#ffffff] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="[flex-flow:wrap] box-border content-center flex gap-6 items-center justify-between p-[32px] relative w-full">
          <Block />
          <NavigationPillList />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#d9d9d9] border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

function Frame2() {
  return <div className="shrink-0 size-[100px]" />;
}

function HeroActions() {
  return (
    <div
      className="relative shrink-0 w-full h-[600px] overflow-hidden"
      data-name="Hero Actions"
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/434045526.hd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35ea1a9412f9&profile_id=174"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80"
            alt="Beautiful green landscape with modern house"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Green overlay for brand consistency and text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 via-green-800/40 to-emerald-700/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center px-6 py-40 w-full max-w-4xl text-center">
          <div className="flex flex-col gap-6 items-center">
            <h1 className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[72px] leading-[1.0] tracking-[-1.44px] max-w-4xl">
              Narra Cliffs
            </h1>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-white/95 text-[28px] leading-[1.3] max-w-2xl mb-4">
              The living starts here
            </p>
            <p className="font-['Inter:Regular',_sans-serif] font-normal text-white/80 text-[20px] leading-[1.4] max-w-2xl">
              Discover exceptional properties surrounded by lush greenery and breathtaking landscapes. Your perfect home awaits in harmony with nature.
            </p>
          </div>
          
          <div className="flex flex-row gap-4 items-center justify-center">
            <button className="bg-white hover:bg-gray-50 transition-colors px-8 py-4 rounded-lg">
              <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-green-800 text-[18px]">
                Explore Properties
              </span>
            </button>
            <button className="bg-green-700 hover:bg-green-800 transition-colors px-8 py-4 rounded-lg border border-green-600">
              <span className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[18px]">
                Schedule Tour
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div
      className="bg-[#e3e3e3] h-[400px] shrink-0 w-full"
      data-name="Section"
    />
  );
}

function TextContentHeading() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2 items-start justify-start leading-[0] not-italic p-0 relative shrink-0 text-left"
      data-name="Text Content Heading"
    >
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold relative shrink-0 text-[#1e1e1e] text-[24px] tracking-[-0.48px] w-full">
        <p className="block leading-[1.2]">What's new?</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#757575] text-[20px] w-full">
        <p className="block leading-[1.2]">Latest insights and updates from the real estate market</p>
      </div>
    </div>
  );
}

// Blog post data
const blogPosts = [
  {
    content: "The luxury real estate market is experiencing unprecedented growth, with premium properties in desirable locations commanding record prices. Buyers are increasingly focused on sustainable features and smart home technology.",
    title: "Luxury Market Trends 2024",
    date: "January 15, 2024",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    content: "Smart home technology is no longer a luxury but a necessity for modern buyers. From automated lighting systems to intelligent security features, tech integration adds significant value to properties.",
    title: "Smart Home Revolution",
    date: "January 10, 2024",
    image: "https://images.unsplash.com/photo-1558618666-fbd6c5c65cd8?auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    content: "Sustainable building practices and eco-friendly features are driving the green real estate movement. Properties with solar panels, energy-efficient systems, and sustainable materials are in high demand.",
    title: "Green Building Boom",
    date: "January 8, 2024",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    content: "Urban development is shifting towards mixed-use spaces that combine residential, commercial, and recreational facilities. These communities offer convenience and lifestyle benefits that appeal to modern residents.",
    title: "Mixed-Use Development",
    date: "January 5, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    content: "The work-from-home trend has permanently changed what buyers look for in properties. Home offices, high-speed internet, and quiet spaces have become essential features for modern homebuyers.",
    title: "Remote Work Impact",
    date: "January 3, 2024",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=400&h=300&q=80"
  },
  {
    content: "Millennial buyers are driving demand for urban properties with walkable neighborhoods, proximity to amenities, and strong community features. They prioritize lifestyle and convenience over square footage.",
    title: "Millennial Preferences",
    date: "December 28, 2023",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=400&h=300&q=80"
  }
];

function BlogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function TextHeading({ blogPost }: { blogPost: typeof blogPosts[0] }) {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Text Heading"
    >
      <BlogImage src={blogPost.image} alt={blogPost.title} />
      <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left w-full">
        <p className="block leading-[1.4]">{blogPost.content}</p>
      </div>
    </div>
  );
}

function Info({ blogPost }: { blogPost: typeof blogPosts[0] }) {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col gap-0.5 grow items-start justify-start leading-[0] min-h-px min-w-px not-italic p-0 relative shrink-0 text-[16px] text-left"
      data-name="Info"
    >
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold justify-center relative shrink-0 text-[#1e1e1e] w-full">
        <p className="block leading-[1.4]">{blogPost.title}</p>
      </div>
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center relative shrink-0 text-[#757575] w-full">
        <p className="block leading-[1.4]">{blogPost.date}</p>
      </div>
    </div>
  );
}

function AvatarBlock({ blogPost }: { blogPost: typeof blogPosts[0] }) {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="Avatar Block"
    >
      <Info blogPost={blogPost} />
    </div>
  );
}

function BlogCard({ blogPost }: { blogPost: typeof blogPosts[0] }) {
  return (
    <div
      className="basis-0 bg-[#ffffff] grow min-h-px min-w-[300px] relative rounded-lg shrink-0"
      data-name="Blog Card"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#d9d9d9] border-solid inset-0 pointer-events-none rounded-lg"
      />
      <div className="min-w-inherit relative size-full">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start min-w-inherit p-[24px] relative w-full">
          <TextHeading blogPost={blogPost} />
          <AvatarBlock blogPost={blogPost} />
        </div>
      </div>
    </div>
  );
}

function CardGrid() {
  return (
    <div
      className="[flex-flow:wrap] box-border content-start flex gap-12 items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Card Grid"
    >
      {blogPosts.map((blogPost, i) => (
        <BlogCard key={i} blogPost={blogPost} />
      ))}
    </div>
  );
}

function CardGridTestimonials() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-full"
      data-name="Card Grid Testimonials"
    >
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-12 items-start justify-start p-[64px] relative w-full">
          <TextContentHeading />
          <CardGrid />
        </div>
      </div>
    </div>
  );
}

function ChatBubble() {
  return (
    <div className="relative shrink-0 size-[50px]" data-name="chat_bubble">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 50 50"
      >
        <g id="chat_bubble">
          <path d={svgPaths.p28b6080} fill="var(--fill-0, #1D1B20)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Figma1() {
  return (
    <div className="h-[35px] relative shrink-0 w-[23.333px]" data-name="Figma">
      <div className="absolute inset-[-5%_-7.5%]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 28 39"
        >
          <g id="Figma">
            <path
              d={svgPaths.pd557680}
              id="Icon"
              stroke="var(--stroke-0, #1E1E1E)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3.5"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function XLogo() {
  return (
    <div className="h-6 relative shrink-0 w-[23.98px]" data-name="X Logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="X Logo">
          <path
            d={svgPaths.p16d01100}
            fill="var(--fill-0, #1E1E1E)"
            id="Icon"
          />
        </g>
      </svg>
    </div>
  );
}

function LogoInstagram() {
  return (
    <div className="relative shrink-0 size-6" data-name="Logo Instagram">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_1_1712)" id="Logo Instagram">
          <path
            d={svgPaths.p3c382d72}
            fill="var(--fill-0, #1E1E1E)"
            id="Icon"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1712">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LogoYouTube() {
  return (
    <div className="relative shrink-0 size-6" data-name="Logo YouTube">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_1_1703)" id="Logo YouTube">
          <path
            d={svgPaths.p13f17d00}
            fill="var(--fill-0, #1E1E1E)"
            id="Icon"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1703">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LinkedIn() {
  return (
    <div className="relative shrink-0 size-6" data-name="LinkedIn">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g clipPath="url(#clip0_1_1709)" id="LinkedIn">
          <path
            d={svgPaths.p167f5280}
            fill="var(--fill-0, #1E1E1E)"
            id="Icon"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_1709">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function ButtonList() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
      data-name="Button List"
    >
      <XLogo />
      <LogoInstagram />
      <LogoYouTube />
      <LinkedIn />
    </div>
  );
}

function Title() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-6 items-start justify-start min-w-60 p-0 relative shrink-0 w-[262px]"
      data-name="Title"
    >
      <div className="flex flex-col font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[20px] text-left">
        <p className="block leading-[1.2]">Narra Cliffs</p>
        <p className="block leading-[1.3] font-['Inter:Regular',_sans-serif] font-normal text-[#757575] text-[14px] mt-1">The living starts here</p>
      </div>
      <ButtonList />
    </div>
  );
}

function TextStrong() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Text Strong"
    >
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-[1.4] whitespace-pre">Use cases</p>
      </div>
    </div>
  );
}

function Title1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pb-4 pt-0 px-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <TextStrong />
    </div>
  );
}

function TextLinkListItem() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[19.1%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">UI design</p>
      </div>
    </div>
  );
}

function TextLinkListItem1() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[12.36%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">UX design</p>
      </div>
    </div>
  );
}

function TextLinkListItem2() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-3.37%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Wireframing</p>
      </div>
    </div>
  );
}

function TextLinkListItem3() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-12.36%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Diagramming</p>
      </div>
    </div>
  );
}

function TextLinkListItem4() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-17.98%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Brainstorming</p>
      </div>
    </div>
  );
}

function TextLinkListItem5() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-55.06%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Online whiteboard</p>
      </div>
    </div>
  );
}

function TextLinkListItem6() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-61.8%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Team collaboration</p>
      </div>
    </div>
  );
}

function TextLinkList() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[262px]"
      data-name="Text Link List"
    >
      <Title1 />
      <TextLinkListItem />
      <TextLinkListItem1 />
      <TextLinkListItem2 />
      <TextLinkListItem3 />
      <TextLinkListItem4 />
      <TextLinkListItem5 />
      <TextLinkListItem6 />
    </div>
  );
}

function TextStrong1() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Text Strong"
    >
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-[1.4] whitespace-pre">Explore</p>
      </div>
    </div>
  );
}

function Title2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pb-4 pt-0 px-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <TextStrong1 />
    </div>
  );
}

function TextLinkListItem7() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[40.45%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Design</p>
      </div>
    </div>
  );
}

function TextLinkListItem8() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal inset-0 justify-center leading-[0] not-italic text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-[1.4] whitespace-pre">Prototyping</p>
      </div>
    </div>
  );
}

function TextLinkListItem9() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-87.64%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">
          Development features
        </p>
      </div>
    </div>
  );
}

function TextLinkListItem10() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-34.83%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Design systems</p>
      </div>
    </div>
  );
}

function TextLinkListItem11() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-88.76%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">
          Collaboration features
        </p>
      </div>
    </div>
  );
}

function TextLinkListItem12() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-31.46%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Design process</p>
      </div>
    </div>
  );
}

function TextLinkListItem13() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[38.2%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">FigJam</p>
      </div>
    </div>
  );
}

function TextLinkList1() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[262px]"
      data-name="Text Link List"
    >
      <Title2 />
      <TextLinkListItem7 />
      <TextLinkListItem8 />
      <TextLinkListItem9 />
      <TextLinkListItem10 />
      <TextLinkListItem11 />
      <TextLinkListItem12 />
      <TextLinkListItem13 />
    </div>
  );
}

function TextStrong2() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full"
      data-name="Text Strong"
    >
      <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#1e1e1e] text-[16px] text-left text-nowrap">
        <p className="block leading-[1.4] whitespace-pre">Resources</p>
      </div>
    </div>
  );
}

function Title3() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start pb-4 pt-0 px-0 relative shrink-0 w-full"
      data-name="Title"
    >
      <TextStrong2 />
    </div>
  );
}

function TextLinkListItem14() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[61.8%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Blog</p>
      </div>
    </div>
  );
}

function TextLinkListItem15() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-22.47%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Best practices</p>
      </div>
    </div>
  );
}

function TextLinkListItem16() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[44.94%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Colors</p>
      </div>
    </div>
  );
}

function TextLinkListItem17() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-1.12%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Color wheel</p>
      </div>
    </div>
  );
}

function TextLinkListItem18() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[31.46%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Support</p>
      </div>
    </div>
  );
}

function TextLinkListItem19() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[3.37%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Developers</p>
      </div>
    </div>
  );
}

function TextLinkListItem20() {
  return (
    <div
      className="h-[22px] relative shrink-0 w-[89px]"
      data-name="Text Link List Item"
    >
      <div className="absolute bottom-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-0 not-italic right-[-38.2%] text-[#1e1e1e] text-[16px] text-left text-nowrap top-0">
        <p className="block leading-[1.4] whitespace-pre">Resource library</p>
      </div>
    </div>
  );
}

function TextLinkList2() {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-[262px]"
      data-name="Text Link List"
    >
      <Title3 />
      <TextLinkListItem14 />
      <TextLinkListItem15 />
      <TextLinkListItem16 />
      <TextLinkListItem17 />
      <TextLinkListItem18 />
      <TextLinkListItem19 />
      <TextLinkListItem20 />
    </div>
  );
}

function Footer() {
  return (
    <div
      className="bg-[#ffffff] relative shrink-0 w-[1200px]"
      data-name="Footer"
    >
      <div className="[flex-flow:wrap] box-border content-start flex gap-4 items-start justify-start overflow-clip pb-40 pt-8 px-8 relative w-[1200px]">
        <Title />
        <TextLinkList />
        <TextLinkList1 />
        <TextLinkList2 />
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#d9d9d9] border-[1px_0px_0px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

export default function ExamplesHomePage() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full"
      data-name="Examples / Home Page"
    >
      <Header />
      <Frame2 />
      <HeroActions />
      <Section />
      <CardGridTestimonials />
      <ChatBubble />
      <Footer />
    </div>
  );
}