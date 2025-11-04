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

export default function Events() {
  // estado de filtros
  const [search, setSearch] = useState("");
  const [showUpcoming, setShowUpcoming] = useState(true);

  // estado del modal
  const [open, setOpen] = useState(false);

  // estado del formulario del modal
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSave = () => {
    console.log("New event:", { title, location, date, file });
    setOpen(false);
    setTitle("");
    setLocation("");
    setDate("");
    setFile(null);
  };

  return (
    <>
      {/* Encabezado */}
      <PageHeader>
        <PageHeaderHeading>My Events</PageHeaderHeading>
      </PageHeader>

      {/* Filtros y botón */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          toggleValue={showUpcoming}
          onToggleChange={setShowUpcoming}
          toggleLabels={{ on: "Upcoming", off: "Past" }}
          placeholder="search events..."
        />

        <Button onClick={() => setOpen(true)}>+ Add New Event</Button>
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

      {/* Modal para añadir evento */}
      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="add new event"
        description="fill in the details below to create a new event."
        onConfirm={handleSave}
      >
        <form className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <ImageUploader
            value={null}
            onChange={setFile}
            label="Upload Event Image"
          />
        </form>
      </BaseModal>
    </>
  );
}
