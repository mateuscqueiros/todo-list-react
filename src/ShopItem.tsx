import { IconCheck, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRef, useState } from "react";

export interface ShopItemType {
  id: number;
  title: string;
}

export function ShopItem({
  item,
  onDelete,
  onEdit,
}: {
  item: ShopItemType;
  onDelete: (id: number) => void;
  onEdit: (item: ShopItemType) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="shop-item">
      <div>
        {!isEditing && <span>{item.title}</span>}
        {isEditing && (
          <input type="text" defaultValue={item.title} ref={nameInputRef} />
        )}
      </div>
      <div className="item-actions">
        {!isEditing && (
          <div className="normal-actions">
            <IconEdit onClick={() => setIsEditing(true)} />
            <IconTrash
              onClick={() => {
                onDelete(item.id);
              }}
            />
          </div>
        )}
        {isEditing && (
          <div className="edit-actions">
            <IconCheck
              onClick={() => {
                const title = nameInputRef.current?.value;
                if (title) {
                  onEdit({
                    id: item.id,
                    title,
                  });
                }
                setIsEditing(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
