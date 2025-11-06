import { useState, useEffect } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageUploader } from "@/components/common/ImageUploader";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { uploadImage } from "@/services/imageService";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { profile, loading, error, createUserProfile, updateUserProfile } =
    useProfile();

  // Simple form state
  const [nickname, setNickname] = useState(profile?.nickname || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(!profile);
  const [saving, setSaving] = useState(false);

  // Update form state when profile loads
  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || "");
      setAvatarFile(null);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  }, [profile]);

  const handleSave = async () => {
    if (!nickname.trim()) return;

    setSaving(true);
    try {
      let avatarUrl = profile?.avatar || null;

      // Subir nueva imagen del avatar si hay una
      if (avatarFile) {
        const uploadedUrl = await uploadImage(avatarFile, "avatars");
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        }
      }

      const profileData = {
        nickname: nickname.trim(),
        avatar: avatarUrl,
      };

      if (profile) {
        await updateUserProfile(profileData);
      } else {
        await createUserProfile(profileData);
      }

      // Limpiar archivo temporal después de guardar
      setAvatarFile(null);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setNickname(profile?.nickname || "");
    setAvatarFile(null);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Mi Perfil</PageHeaderHeading>
      </PageHeader>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Información básica */}
        <Card>
          <CardHeader>
            <CardTitle>Información de la cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <p className="text-sm">{user?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Usuario desde
              </label>
              <p className="text-sm">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString("es-ES")
                  : "Reciente"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Perfil */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{profile ? "Tu perfil" : "Crear perfil"}</CardTitle>
            {profile && !isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar y foto de perfil */}
            <div className="flex items-center space-x-6">
              {isEditing ? (
                <div className="flex flex-col items-center space-y-2">
                  <ImageUploader
                    value={profile?.avatar || null}
                    onChange={setAvatarFile}
                    label="Subir"
                    helpText="Avatar"
                    variant="avatar"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    JPG, PNG, GIF
                  </p>
                </div>
              ) : (
                <Avatar className="h-16 w-16">
                  {profile?.avatar && (
                    <AvatarImage src={profile.avatar} alt="Avatar" />
                  )}
                  <AvatarFallback className="text-lg">
                    {(nickname || user?.email || "U")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="font-medium">{nickname || "Sin nombre"}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            {/* Formulario simple */}
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nickname"
                    className="block text-sm font-medium mb-2"
                  >
                    Nombre de usuario *
                  </label>
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Tu nombre de usuario"
                    disabled={saving}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving || !nickname.trim()}
                  >
                    {saving
                      ? "Guardando..."
                      : profile
                      ? "Actualizar"
                      : "Crear perfil"}
                  </Button>
                  {profile && (
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={saving}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            ) : !profile ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">
                  Crea tu perfil para personalizar tu experiencia
                </p>
                <Button onClick={() => setIsEditing(true)}>Crear perfil</Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={signOut}>
              Cerrar sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
