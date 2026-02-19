export function AsciiArt() {
  const lines = [
    ' ██╗  ██╗██╗ ██████╗ ██╗  ██╗████████╗███████╗ ██████╗██╗  ██╗',
    ' ██║  ██║██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝██╔════╝██║  ██║',
    ' ███████║██║██║  ███╗███████║   ██║   █████╗  ██║     ███████║',
    ' ██╔══██║██║██║   ██║██╔══██║   ██║   ██╔══╝  ██║     ██╔══██║',
    ' ██║  ██║██║╚██████╔╝██║  ██║   ██║   ███████╗╚██████╗██║  ██║',
    ' ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝',
  ];

  const colors = ['#67BD4D', '#FDBA32', '#F6862A', '#E24244', '#99449A', '#18A0DD'];

  const message = lines.map((line) => `%c${line}`).join('\n');

  const styles = colors.map(
    (color) => `color: ${color}; font-family: monospace; font-weight: bold; text-shadow: 0 0 2px ${color};`,
  );

  console.log(message, ...styles);

  console.log('%cSystem Status: %cWelcome:)', 'color: gray;', 'color: #00ff00; font-weight: bold;');
}
