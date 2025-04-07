# VPN Watch

A TypeScript script that monitors and maintains VPN connectivity on Windows.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure your VPN name:
   - Open `src/index.ts`
   - Replace `'Your VPN Name'` with your actual VPN name

3. Build the project:
```bash
npm run build
```

## Usage

Run the script:
```bash
npm start
```

The script will:
- Check VPN connection status every 30 seconds
- Automatically reconnect if the VPN is disconnected
- Log connection status and any errors to the console

## Configuration

You can modify the check interval in `src/index.ts` by changing the `check_interval_ms` value in the config object.
