import React, { useState, useEffect } from "react";
import axiosConfig from "../Utils/axiosConfig";
import { notify } from "../Utils/Helper";

const AutoCompleteInput = ({ onTagSelect, selectedTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (inputValue.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axiosConfig.get(
            `/api/products/tags/suggestions?input=${encodeURIComponent(
              inputValue
            )}`
          );
          if (response.data) {
            const filteredSuggestions = response.data.filter(
              (tag) => !selectedTags.includes(tag)
            );
            setSuggestions(filteredSuggestions);
            setIsOpen(true);
          }
        } catch (error) {
          if (error.response) {
            const { data } = error.response;
            if (data.details && Array.isArray(data.details) && data.message) {
              notify(data.message || "An unexpected error occurred.", "error");
            }
          } else {
            notify("An unexpected error occurred.", "error");
          }
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [inputValue]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelect = (tag) => {
    setInputValue("");
    setSuggestions([]);
    setIsOpen(false);
    onTagSelect(tag);
  };

  return (
    <div className="relative">
      <input
        className="h-10 pe-10 rounded px-3 bg-white border-2 border-gray-300 focus:ring-0 outline-none w-full"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search tags..."
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((tag, index) => (
            <li
              key={index}
              onClick={() => handleSelect(tag)}
              className="cursor-pointer p-2 hover:bg-gray-100"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
