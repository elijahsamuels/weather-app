export default function timeConversion(timestamp) {
  let time = new Date(timestamp);
	return time.toLocaleTimeString('en-US')
}
