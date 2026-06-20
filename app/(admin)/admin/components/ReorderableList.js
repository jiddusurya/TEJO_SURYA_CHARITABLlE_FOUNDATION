"use client";
import React, { useMemo, useState } from 'react';

const moveItem = (items, fromIndex, toIndex) => {
  const nextItems = [...items];
  const [movedItem] = nextItems.splice(fromIndex, 1);
  nextItems.splice(toIndex, 0, movedItem);
  return nextItems;
};

export default function ReorderableList({ items, setItems, onSaveOrder, renderItem, emptyText = 'No items found yet.' }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const dragPropsForIndex = useMemo(() => {
    return (index) => ({
      draggable: true,
      onDragStart: () => setDragIndex(index),
      onDragOver: (event) => {
        event.preventDefault();
        if (dragIndex === null || dragIndex === index || dragIndex < 0) {
          return;
        }
        setItems((currentItems) => moveItem(currentItems, dragIndex, index));
        setDragIndex(index);
        setHasChanges(true);
      },
      onDragEnd: () => setDragIndex(null),
    });
  }, [dragIndex, setItems]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveOrder(items);
      setHasChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  if (!items.length) {
    return <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">{emptyText}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">Drag items to reorder them, then save the new order.</p>
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isSaving ? 'Saving...' : hasChanges ? 'Save Order' : 'Saved'}
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => renderItem(item, index, { dragProps: dragPropsForIndex(index), isDragging: dragIndex === index }))}
      </div>
    </div>
  );
}
