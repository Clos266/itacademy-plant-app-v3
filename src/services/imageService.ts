import { supabase } from "./supabaseClient";

// Función simple para subir imagen y devolver URL
export async function uploadImage(
  file: File,
  folder: string = "plants"
): Promise<string | null> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${folder}/${fileName}`, file);

    if (error) {
      console.error("Upload error:", error.message);
      alert(
        `Error subiendo imagen: ${error.message}\n\n¿Has configurado las políticas de Storage en Supabase?`
      );
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(data.path);

    return publicUrl;
  } catch (err: any) {
    console.error("Upload exception:", err);
    alert(`Error inesperado: ${err.message}`);
    return null;
  }
}
