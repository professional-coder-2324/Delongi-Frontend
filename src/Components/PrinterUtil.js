import qz from 'qz-tray';

const PrinterUtil = {
  initialize: async () => {
    try {
        await qz.websocket.connect({ retries: 3, delay: 1 });
        console.log('QZ Tray connected from localhost');
        // Perform additional testing or print a test label here if necessary
      } catch (err) {
        console.error('Error connecting to QZ Tray from localhost:', err);
      } finally {
        await qz.websocket.disconnect();
        console.log('QZ Tray disconnected');
      }
  },

  printZPL: async (zplContent, scale = 1.5) => {
    try {
      await qz.printers.find();
      const printer = qz.printers.getDefault();
  
      if (printer) {
        await qz.print({
          printer,
          data: zplContent,
          type: 'RAW',
          options: {
            scale, // Define the scale here
          },
        });
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