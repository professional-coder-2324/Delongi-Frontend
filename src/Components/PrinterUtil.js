import qz from 'qz-tray';

const PrinterUtil = {
  initialize: async () => {
    try {
      await qz.websocket.connect();
      console.log('QZ Tray connected');
    } catch (err) {
      console.error('Error connecting to QZ Tray:', err);
    }
  },

  printZPL: async (zplContent) => {
    try {
      console.log(zplContent, "ZPL")
      await qz.printers.find();
      const printer = await qz.printers.getDefault();
      if (printer) {
        let config = qz.configs.create(printer)
        console.log(printer, "Printer")
       let data = await qz.print(
          config,
          [zplContent]
        );
        console.log('ZPL II commands sent to the printer');
      } else {
        console.error('No default printer found');
      }
    } catch (err) {
      console.error('Error printing ZPL:', err);
    }
  },

  terminate: () => {
    qz.websocket.disconnect();
    console.log('QZ Tray disconnected');
  },
};

export default PrinterUtil;
