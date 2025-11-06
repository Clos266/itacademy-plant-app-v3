import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

interface ImageUploaderProps {
  value?: string | null;
  onChange: (file: File | null) => void;
  label?: string;
  helpText?: string;
  variant?: "default" | "avatar";
}

export function ImageUploader({
  value = "",
  onChange,
  label = "upload image",
  helpText = "Click here",
  variant = "default",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Si llega un nuevo valor externo (por ejemplo al editar una planta existente)
  useEffect(() => {
    if (value) setPreview(value);
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    }
  };

  const handleClear = () => {
    setPreview("");
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Configurar estilos según la variante
  const isAvatar = variant === "avatar";
  const containerSize = isAvatar ? "w-24 h-24" : "w-40 h-40";
  const imageRounding = isAvatar ? "rounded-full" : "rounded-xl";
  const borderRounding = isAvatar ? "rounded-full" : "rounded-xl";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {preview ? (
        <div
          className={`relative group cursor-pointer flex-shrink-0 ${containerSize}`}
          onClick={handleClick}
        >
          <img
            src={preview}
            alt="Uploaded"
            className={`${containerSize} object-cover ${imageRounding} border border-border shadow-sm transition-transform group-hover:scale-[1.02]`}
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 rounded-full p-1 h-6 w-6 opacity-90 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`flex flex-col items-center justify-center gap-2 ${containerSize} ${borderRounding} border-2 border-dashed border-border text-muted-foreground hover:bg-muted/40 cursor-pointer transition-colors flex-shrink-0`}
        >
          <Upload className="w-6 h-6" />
          <p className="text-sm text-center">{helpText}</p>
          <Button variant="outline" size="sm" type="button">
            {label}
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
}
