import { assetPath } from "@/lib/basePath";

export default function BrowserFrame({
  src,
  alt = "Application screen",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="bg-[#2c2c2e] rounded-[12px] shadow-[0_16px_48px_rgba(0,0,0,0.35)] overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#363638]">
        <div className="flex gap-[6px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#2c2c2e] rounded-md px-4 py-1 text-[11px] text-[#8e8e93] font-sans max-w-[260px] truncate text-center">
            {alt}
          </div>
        </div>
        <div className="w-[54px]" />
      </div>
      {/* Content */}
      <img
        src={assetPath(src)}
        alt={alt}
        className="w-full h-auto block"
      />
    </div>
  );
}
