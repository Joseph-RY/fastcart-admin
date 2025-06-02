import React, { useState } from "react";
import { TextField, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const OptionsBlock = ({ options, setOptions }) => {
  const [newOptionName, setNewOptionName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newValues, setNewValues] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setNewOptionName("");
    setNewValue("");
    setNewValues([]);
    setOpen(true);
  };

  const handleAddValue = (event) => {
    event.preventDefault();
    setNewValues((el) => [...el, newValue]);
    setNewValue("");
  };

  const handleRemoveValue = (optionName, valueToRemove) => {
    setOptions((e) => {
      const updatedValues = e[optionName].filter((e) => e != valueToRemove);
      const newOptions = { ...e };
      if (updatedValues.length == 0) {
        delete newOptions[optionName];
      } else {
        newOptions[optionName] = updatedValues;
      }
      return newOptions;
    });
  };

  const handleSaveOption = () => {
    setOptions((e) => ({
      ...e,
      [newOptionName]: newValues,
    }));
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {Object.entries(options).map(([label, values]) => (
        <div key={label} className="flex items-start justify-between">
          <div className="w-[45%] border-[1px] border-gray-300 p-4 rounded-[4px] flex items-center font-medium">{label}</div>
          <div className="w-[45%] border-[1px] border-gray-300 px-4 py-3 rounded-[4px] flex flex-wrap gap-2">
            {values.map((value, i) => (
              <Chip key={i} label={value} onDelete={() => handleRemoveValue(label, value)} deleteIcon={<CloseIcon />} className="bg-gray-100 !text-gray-500 !rounded-[4px]" />
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleDialogOpen} className="text-sm text-blue-600 font-medium hover:underline">
        + Add more
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">Option</span>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="flex flex-col gap-3 !py-3">
          <TextField label="Option name" variant="outlined" size="small" fullWidth value={newOptionName} onChange={(e) => setNewOptionName(e.target.value)} />

          <form onSubmit={handleAddValue} className="flex items-center gap-2">
            <TextField placeholder="Enter value name" variant="outlined" size="small" value={newValue} onChange={(e) => setNewValue(e.target.value)} fullWidth />
          </form>

          <div className="flex flex-wrap gap-2">
            {newValues.map((e, idx) => (
              <Chip key={idx} label={e} onDelete={() => setNewValues((el) => el.filter((val) => val !== e))} deleteIcon={<CloseIcon />} className="bg-gray-100" />
            ))}
          </div>
        </DialogContent>

        <DialogActions className="px-6 pb-4">
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveOption} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OptionsBlock;
