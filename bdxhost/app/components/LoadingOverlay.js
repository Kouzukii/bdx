import * as React from 'react';
import CircularProgress from '@material-ui/core/es/CircularProgress';

export default function LoadingOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        background: 'rgba(0, 0, 0, 0.25)'
      }}
    >
      <CircularProgress style={{ margin: 'auto' }} size={60} />
    </div>
  );
}
