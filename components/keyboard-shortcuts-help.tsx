"use client"

import { useState } from "react"
import { HelpCircle, X, Keyboard } from "lucide-react"
import { IconButton, Dialog, DialogTitle, DialogContent, Box, Typography, Chip, Fab } from "@mui/material"

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: "↑ / k", description: "Previous section" },
    { key: "↓ / j", description: "Next section" },
    { key: "1-9", description: "Jump to section" },
    { key: "Home", description: "First section" },
    { key: "End", description: "Last section" },
    { key: "?", description: "Show keyboard shortcuts" },
  ]

  return (
    <>
      <Fab
        onClick={() => setIsOpen(true)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 30,
          bgcolor: "background.paper",
          color: "text.secondary",
          border: 1,
          borderColor: "divider",
          "&:hover": {
            bgcolor: "action.hover",
            transform: "scale(1.1)",
          },
          transition: "all 0.2s ease",
        }}
        title="Keyboard shortcuts (?)"
      >
        <Keyboard size={20} />
      </Fab>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  p: 0.5,
                  borderRadius: 1,
                  bgcolor: "primary.light",
                  color: "primary.main",
                }}
              >
                <HelpCircle size={20} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Keyboard Shortcuts
              </Typography>
            </Box>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{
                color: "text.secondary",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <X size={20} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {shortcuts.map((shortcut, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {shortcut.description}
                </Typography>
                <Chip
                  label={shortcut.key}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                />
              </Box>
            ))}
            <Box sx={{ pt: 1, borderTop: 1, borderColor: "divider" }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Press{" "}
                <Chip
                  label="Esc"
                  size="small"
                  variant="outlined"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    height: "20px",
                    mx: 0.5,
                  }}
                />{" "}
                to close this dialog
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
