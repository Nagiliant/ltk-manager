import { LuPlus, LuTrash2, LuUserPlus, LuUsers } from "react-icons/lu";

import { Button, FormField, IconButton, Menu, SectionCard } from "@/components";
import type { AuthorProfile, WorkshopAuthor } from "@/lib/tauri";

interface AuthorsSectionProps {
  authors: WorkshopAuthor[];
  authorProfiles?: AuthorProfile[];
  onAdd: (initial?: Partial<WorkshopAuthor>) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: "name" | "role", value: string) => void;
}

export function AuthorsSection({
  authors,
  authorProfiles,
  onAdd,
  onRemove,
  onUpdate,
}: AuthorsSectionProps) {
  const hasProfiles = authorProfiles && authorProfiles.length > 0;

  return (
    <SectionCard
      title="Authors"
      icon={<LuUsers className="h-4 w-4" />}
      description="People who contributed to this mod."
      action={
        hasProfiles ? (
          <Menu.Root>
            <Menu.Trigger
              render={
                <Button variant="outline" size="sm" left={<LuPlus className="h-4 w-4" />}>
                  Add Author
                </Button>
              }
            />
            <Menu.Portal>
              <Menu.Positioner>
                <Menu.Popup>
                  <Menu.Item icon={<LuUserPlus className="h-4 w-4" />} onClick={() => onAdd()}>
                    Empty Author
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.GroupLabel>From Profiles</Menu.GroupLabel>
                  {authorProfiles.map((p) => (
                    <Menu.Item key={p.id} onClick={() => onAdd({ name: p.name, role: p.role })}>
                      {p.name || "Unnamed"}
                      {p.role && <span className="ml-1 text-surface-400">— {p.role}</span>}
                    </Menu.Item>
                  ))}
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        ) : (
          <Button
            variant="outline"
            size="sm"
            left={<LuPlus className="h-4 w-4" />}
            onClick={() => onAdd()}
          >
            Add Author
          </Button>
        )
      }
    >
      {authors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1 text-xs font-medium text-surface-400">
            <div className="flex-1">Name</div>
            <div className="w-48">Role</div>
            <div className="w-9" />
          </div>

          {authors.map((author, index) => (
            <div key={index} className="flex items-center gap-2">
              <FormField
                value={author.name}
                onChange={(e) => onUpdate(index, "name", e.target.value)}
                placeholder="Author name"
                className="flex-1"
              />
              <FormField
                value={author.role ?? ""}
                onChange={(e) => onUpdate(index, "role", e.target.value)}
                placeholder="e.g. 3D Artist"
                className="w-48"
              />
              <IconButton
                icon={<LuTrash2 className="h-4 w-4" />}
                variant="ghost"
                size="sm"
                onClick={() => onRemove(index)}
              />
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
