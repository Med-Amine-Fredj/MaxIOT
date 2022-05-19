import {
  insertDevice,
  removeDevice,
  updateDevices,
} from '../../app/store/actions/devicesActions';
import {
  getDevicesData,
  updateDevicesData,
} from '../../app/store/actions/devicesDataActions';
import {
  insertUiSyling,
  removeUiStyling,
  updateUiStyling,
} from '../../app/store/actions/uiStylingActions';

export const socketConnection = (socket, store) => {
  socket.on('connect', () => {
    console.log('Connected with ID : ', socket.id);
    socket.on('devices-updated', (data) => {
      updateDevices(store, data.id, data.meta);
    });

    socket.on('devices-removed', (data) => {
      removeDevice(store, data);
    });

    socket.on('devices-inserted', (data) => {
      insertDevice(store, data);
      getDevicesData(store);
    });

    socket.on('uiStyling-added', (data) => {
      insertUiSyling(store, data);
    });

    socket.on('uiStyling-removed', (data) => {
      removeUiStyling(store, data);
    });

    socket.on('uiStyling-updated', (data) => {
      updateUiStyling(store, data.id, data.components);
    });

    socket.on('devices-values-update', (data) => {
      updateDevicesData(store, data.id, data.values);
    });
    // x8WIv7-mJelg7on_ALbx
  });

  socket.on('disconnect', () => {
    console.log('disconnected '); // undefined
  });

  socket.on('connect_error', (err) => {
    console.log('error connecting', err);
    socket.connect();
  });
};

// };
