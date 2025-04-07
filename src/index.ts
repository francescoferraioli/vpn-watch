import cmd from 'node-cmd';

interface VpnConfig {
  check_interval_ms: number;
  vpn_name: string;
}

const config: VpnConfig = {
  check_interval_ms: 30000, // Check every 30 seconds
  vpn_name: 'Your VPN Name' // Replace with your VPN name
};

async function check_vpn_connection(): Promise<boolean> {
  return new Promise((resolve) => {
    cmd.run('netsh wlan show interfaces', (err: Error | null, data: string) => {
      if (err) {
        console.error('Error checking VPN status:', err);
        resolve(false);
        return;
      }

      // Check if VPN is connected by looking for the VPN name in the output
      const is_connected = data.includes(config.vpn_name);
      resolve(is_connected);
    });
  });
}

async function connect_to_vpn(): Promise<void> {
  return new Promise((resolve, reject) => {
    cmd.run(`netsh wlan connect name="${config.vpn_name}"`, (err: Error | null) => {
      if (err) {
        console.error('Error connecting to VPN:', err);
        reject(err);
        return;
      }
      console.log(`Connected to VPN: ${config.vpn_name}`);
      resolve();
    });
  });
}

async function monitor_vpn(): Promise<void> {
  while (true) {
    try {
      const is_connected = await check_vpn_connection();
      
      if (!is_connected) {
        console.log('VPN disconnected. Attempting to reconnect...');
        await connect_to_vpn();
      } else {
        console.log('VPN is connected');
      }
    } catch (error) {
      console.error('Error in VPN monitoring:', error);
    }

    // Wait for the configured interval before checking again
    await new Promise(resolve => setTimeout(resolve, config.check_interval_ms));
  }
}

// Start monitoring
console.log('Starting VPN monitoring...');
monitor_vpn().catch(error => {
  console.error('Fatal error in VPN monitoring:', error);
  process.exit(1);
}); 