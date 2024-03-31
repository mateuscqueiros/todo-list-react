import { IconPlus } from "@tabler/icons-react";
import { useRef, useState } from "react";
import "./App.scss";
import { ShopItem, ShopItemType } from "./ShopItem";

const shopListItems: ShopItemType[] = [
  {
    id: 0,
    title: "Frutas",
  },
  {
    id: 1,
    title: "Comida",
  },
  {
    id: 2,
    title: "Bebida",
  },
  {
    id: 3,
    title: "Limpeza",
  },
];

function App() {
  const [items, setItems] = useState<ShopItemType[]>(shopListItems);
  const addInputRef = useRef<HTMLInputElement>(null);
  const maxId = Math.max(...items.map((item) => item.id));

  console.log(items);

  function handleCreate() {
    const title = addInputRef.current?.value;
    if (title) {
      setItems([...items, { id: maxId + 1, title }]);
    }
  }

  function handleEdit(editedItem: ShopItemType) {
    setItems([
      ...items.filter((item) => item.id !== editedItem.id),
      editedItem,
    ]);
  }

  function handleDelete(id: number) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div id="container">
      <div className="actions">
        <input id="add-input" type="text" ref={addInputRef} />
        <IconPlus size={20} onClick={handleCreate} />
      </div>
      {items.length <= 0 && <span className="no-items-message">Sem itens</span>}
      <ul className="items-list">
        {items.map((item) => (
          <ShopItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
