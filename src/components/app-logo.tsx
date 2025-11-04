import { appConfig } from "@/config/app";

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/favicon.svg"
        className="size-6 md:size-8"
        alt={`${appConfig.name} logo`}
      />
      <span className="font-semibold text-nowrap">{appConfig.name}</span>
    </div>
  );
}
