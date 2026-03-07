import { assetPath } from "@/lib/basePath";

export default function PhoneFrame({
  src,
  alt = "Mobile screen",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="bg-[#2c2c2e] rounded-[44px] p-[10px] shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
      <div className="rounded-[36px] overflow-hidden">
        <img
          src={assetPath(src)}
          alt={alt}
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
}
