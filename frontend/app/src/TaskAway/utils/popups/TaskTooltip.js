import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';

export default function TaskTooltip({ component, label }) {
  return (
    <Tooltip title={label} placement="right">
        {component}
    </Tooltip>
  );
}