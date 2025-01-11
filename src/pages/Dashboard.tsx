import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CRUDItem } from "../types";

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState<CRUDItem[]>(() => {
    const stored = localStorage.getItem("crud_items");
    return stored ? JSON.parse(stored) : [];
  });

  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";

  console.log(searchQuery);

  const [editingItem, setEditingItem] = useState<CRUDItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    localStorage.setItem("crud_items", JSON.stringify(items));
  }, [items]);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ search: e.target.value, page: "1" });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ search: searchQuery, page: page.toString() });
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = crypto.randomUUID();
    setItems([
      ...items,
      {
        id: newId,
        ...newItem,
        createdAt: new Date().toISOString(),
      },
    ]);
    setNewItem({ name: "", email: "", role: "" });
  };

  const handleEdit = (item: CRUDItem) => {
    setEditingItem(item);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setItems(
        items.map((item) => (item.id === editingItem.id ? editingItem : item))
      );
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border rounded placeholder:text-gray-600 dark:placeholder:text-gray-400 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <form onSubmit={handleAdd} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="p-2 border rounded bg-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
            className="p-2 border rounded bg-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Role"
            value={newItem.role}
            onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
            className="p-2 border rounded bg-gray-100 placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <thead className="text-gray-50">
            <tr className="bg-gray-600 dark:bg-gray-700 ">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Created At</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} className="border-b dark:border-gray-700">
                <td className="px-6 py-4 text-gray-900 dark:text-gray-50">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-50">
                  {item.email}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-50">
                  {item.role}
                </td>
                <td className="px-6 py-4 text-gray-900 dark:text-gray-50">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96">
            <h2 className="text-xl mb-4">Edit Item</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, name: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="email"
                value={editingItem.email}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, email: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                value={editingItem.role}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, role: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
