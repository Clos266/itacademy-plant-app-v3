import { useState } from "react";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterBar } from "@/components/common/FilterBar";
import { BaseModal } from "@/components/common/BaseModal";
import { ImageUploader } from "@/components/common/ImageUploader";

export default function MyPlants() {
  // estado de filtros
  const [search, setSearch] = useState("");
  const [showAvailable, setShowAvailable] = useState(true);

  // estado del modal
  const [open, setOpen] = useState(false);

  // estado del formulario del modal
  const [name, setName] = useState("");
  const [sciName, setSciName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSave = () => {
    console.log("New plant:", { name, sciName, file });
    setOpen(false);
    setName("");
    setSciName("");
    setFile(null);
  };

  return (
    <>
      {/* Encabezado */}
      <PageHeader>
        <PageHeaderHeading>My Plants</PageHeaderHeading>
      </PageHeader>

      {/* Filtros y botón */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          toggleValue={showAvailable}
          onToggleChange={setShowAvailable}
          toggleLabels={{ on: "Available", off: "Unavailable" }}
          placeholder="search plants..."
        />

        <Button onClick={() => setOpen(true)}>+ Add New Plant</Button>
      </div>

      {/* Lista simulada */}
      <Card>
        <CardHeader>
          <CardTitle>lorem ipsum</CardTitle>
          <CardDescription>
            lorem ipsum dolor sit amet consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            (lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod)
          </p>
        </CardContent>
      </Card>

      {/* Modal para añadir planta */}
      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="add new plant"
        description="fill in the details below to add a new plant."
        onConfirm={handleSave}
      >
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Common name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Scientific name"
            value={sciName}
            onChange={(e) => setSciName(e.target.value)}
          />
          <ImageUploader
            value={null}
            onChange={setFile}
            label="Upload Plant Image"
          />
        </form>
      </BaseModal>
    </>
  );
}
