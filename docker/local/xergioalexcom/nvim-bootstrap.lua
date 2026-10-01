-- Build-time plugin install for DeepWorkPlan Vim.
--
-- Run as: nvim --headless -c "luafile nvim-bootstrap.lua"
--
-- init.lua already starts pckr's autoinstall (an async clone of every plugin).
-- This only keeps the headless instance alive until every plugin directory
-- exists, then exits non-zero on timeout so `docker build` fails loudly
-- instead of shipping an image whose first `nvim` prints "Installing plugins.
-- Quit Neovim when it finishes, then open it again."
local plugins = require('pckr.plugin').plugins

local function pending()
  local missing = {}
  for name, p in pairs(plugins) do
    if vim.fn.isdirectory(p.install_path) == 0 then
      missing[#missing + 1] = name
    end
  end
  return missing
end

local ok = vim.wait(900000, function()
  return #pending() == 0
end, 1000)

-- Post-install `run` hooks (markdown-preview, bracey) finish after the clone.
vim.wait(20000, function()
  return false
end, 1000)

local missing = pending()
if ok then
  io.stdout:write('\nDeepWorkPlan Vim: all plugins installed\n')
  vim.cmd('qa!')
else
  io.stderr:write('\nDeepWorkPlan Vim: plugins still missing: ' .. table.concat(missing, ', ') .. '\n')
  vim.cmd('cq')
end
